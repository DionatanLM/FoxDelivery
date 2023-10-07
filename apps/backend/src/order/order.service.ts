import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  API_KEY,
  DELIVERYMAN_REPOSITORY,
  DELIVERYMAN_SOCKETS,
  ORDER_REPOSITORY,
  STORE_REPOSITORY,
} from 'src/config/constants/providers';
import { Order } from 'src/entities/Order.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/entities/Store.entity';
import { Deliveryman } from 'src/entities/Deliveryman.entity';
import { Server } from 'socket.io';
import { ORDER_STATUS } from 'src/config/constants/order-status.enum';
import { OrderGateway } from './order.gateway';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private orderRepository: Repository<Order>,
    @Inject(STORE_REPOSITORY)
    private storeRepository: Repository<Store>,
    @Inject(DELIVERYMAN_REPOSITORY)
    private deliverymanRepository: Repository<Deliveryman>,
    @Inject(DELIVERYMAN_SOCKETS)
    private readonly socketServer: Server,
    private readonly orderGateway: OrderGateway,
    @Inject(API_KEY) private readonly apiKey: string,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOrderByUserStoreUuid(storeUuid: string) {
    const orderByStore = await this.orderRepository.find({
      where: { storeUuid },
    });
    return orderByStore;
  }

  async findOrderByDeliverymanUuid(deliverymanUuid: string) {
    const orderByDeliveryman = await this.orderRepository.find({
      where: { deliverymanUuid },
    });
    return orderByDeliveryman;
  }

  //Cria um novo pedido para uma loja específica e atribui o entregador mais próximo disponível.
  async createOrderByUserStore(createOrderDto: CreateOrderDto) {
    const existingOrder = await this.orderRepository.findOne({
      where: {
        orderNumber: createOrderDto.orderNumber,
        storeUuid: createOrderDto.storeUuid,
      },
    });
    if (existingOrder) {
      throw new HttpException('Já existe um pedido com esse número', 404);
    }

    const closestDeliveryman = await this.findDeliveryForOrder(
      createOrderDto.storeUuid,
    );
    console.log(closestDeliveryman);
    const calculateDistanceByStore = await this.calculateDistanceFromStore(
      createOrderDto.storeUuid,
      createOrderDto.latLngAddress,
    );

    if (closestDeliveryman) {
      const newOrder = Object.assign(new Order(), {
        orderNumber: createOrderDto.orderNumber,
        storeUuid: createOrderDto.storeUuid,
        clientName: createOrderDto.clientName,
        price: createOrderDto.price,
        typePayment: createOrderDto.typePayment,
        address: createOrderDto.address,
        latLngAddress: createOrderDto.latLngAddress,
        status: ORDER_STATUS.PENDING,
        acceptedByDeliveryman: 0,
        totalDistance: calculateDistanceByStore,
      });
      await this.orderRepository.save([newOrder]);

      const deliverymanSocketId =
        await this.orderGateway.deliverymanSocketsMap.get(
          closestDeliveryman.uuid,
        );

      if (deliverymanSocketId) {
        // Emitir um evento socket.io apenas para o entregador mais próximo
        await this.orderGateway.handleNewOrder(deliverymanSocketId, newOrder);

        try {
          const result = await this.waitForDeliverymanResponse(
            deliverymanSocketId,
            newOrder.uuid,
          );

          // Atualizar o pedido com base na resposta do entregador
          if ((result as { response?: string }).response === 'accept') {
            console.log('entregador aceitou o pedido');
            newOrder.status = ORDER_STATUS.RECEIVED;
            newOrder.acceptedByDeliveryman = 1;
            newOrder.deliverymanUuid = closestDeliveryman.uuid;
            await this.orderRepository.save(newOrder);
          } else {
            // implementar logica para caso entregar não aceitar
          }
        } catch {
          // implementar logica para caso entregar não responder
        }
      }
    }
  }

  // Função para aguardar a resposta do entregador
  async waitForDeliverymanResponse(deliverymanSocketId, orderUuid) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearInterval(interval); // Cancela o intervalo, pois o tempo limite foi excedido
        reject(new Error('Tempo limite para resposta do entregador excedido'));
      }, 60000); // Tempo limite de 60 segundos (ajuste conforme necessário)

      const interval = setInterval(() => {
        // VERIFICAR SE É O MESMO deliverymanSocketId e o mesmo orderUuid

        if (
          this.orderGateway.responsePromises[deliverymanSocketId] &&
          this.orderGateway.responsePromises[deliverymanSocketId].orderUuid ===
            orderUuid
        ) {
          clearTimeout(timeout); // Cancela o timeout, pois a resposta foi recebida
          const response =
            this.orderGateway.responsePromises[deliverymanSocketId];
          resolve(response); // Resolve a Promise com os dados da resposta do entregador
          clearInterval(interval); // Cancela o intervalo, pois a resposta foi recebida
        }
      }, 1000); // Intervalo de verificação a cada segundo (ajuste conforme necessário)
    });
  }

  // função para encontrar o entregador mais próximo da loja
  async findDeliveryForOrder(storeUuid: string) {
    const store = await this.storeRepository.findOne({
      where: { uuid: storeUuid },
    });
    const activeDeliverymen = await this.deliverymanRepository.find({
      where: { isActive: true },
    });

    let closestDeliveryman: Deliveryman | null = null;
    let shortestDistance = Infinity;

    for (const deliveryman of activeDeliverymen) {
      const distance = await this.calculateDistance(
        store.lat,
        store.lng,
        deliveryman.lat,
        deliveryman.lng,
      );

      if ((await distance) < shortestDistance) {
        shortestDistance = await distance;
        closestDeliveryman = deliveryman;
      }
    }

    return closestDeliveryman;
  }

  // Calcula a distância em quilômetros entre dois pontos na Terra, por latitude e longitude.
  async calculateDistance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371; // Raio da Terra em quilômetros

    // Converte as coordenadas de graus para radianos
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLng1 = (lng1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLng2 = (lng2 * Math.PI) / 180;

    // Diferença entre as coordenadas de latitude e longitude
    const dLat = radLat2 - radLat1;
    const dLng = radLng2 - radLng1;

    // Fórmula de Haversine
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distância em quilômetros
    const distance = earthRadius * c;
    return distance;
  }

  async calculateDistanceBetweenTwoPoints(
    originLat: number,
    originLng: number,
    destinationLat: number,
    destinationLng: number,
  ): Promise<string> {
    const origin = `${originLat},${originLng}`;
    const destination = `${destinationLat},${destinationLng}`;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${this.apiKey}`,
      );

      const distance = response.data.rows[0].elements[0].distance.text;
      return distance;
    } catch (error) {
      throw error;
    }
  }

  async calculateDistanceFromStore(storeUuid: string, latLngEnd: string) {
    const store = await this.storeRepository.findOne({
      where: { uuid: storeUuid },
    });

    if (!store) {
      throw new Error('Loja não encontrada');
    }

    // Parse das coordenadas de destino do formato JSON
    const destinationCoords = JSON.parse(latLngEnd);
    const destinationLat = destinationCoords.lat;
    const destinationLng = destinationCoords.lng;

    // Use a função calculateDistance para calcular a distância
    const distance = await this.calculateDistance(
      store.lat,
      store.lng,
      destinationLat,
      destinationLng,
    );

    return distance;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
