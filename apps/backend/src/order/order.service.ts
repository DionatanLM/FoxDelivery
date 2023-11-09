import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  API_KEY,
  DELIVERYMAN_REPOSITORY,
  ORDER_REPOSITORY,
  STORE_REPOSITORY,
} from 'src/config/constants/providers';
import { Order } from 'src/entities/Order.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/entities/Store.entity';
import { Deliveryman } from 'src/entities/Deliveryman.entity';
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
    private readonly orderGateway: OrderGateway,
    @Inject(API_KEY) private readonly apiKey: string,
  ) {}

  async findOrderByUserStoreUuid(storeUuid: string) {
    const orderByStore = await this.orderRepository.find({
      where: { storeUuid },
    });
    return orderByStore;
  }

  async findOrderByDeliverymanUuid(deliverymanUuid: string) {
    const orders = await this.orderRepository.find({
      where: { deliverymanUuid },
    });

    // Array para armazenar os detalhes do pedido junto com os detalhes da loja
    const ordersWithStoreDetails = [];

    for (const order of orders) {
      const store = await this.storeRepository.findOne({
        where: { uuid: order.storeUuid },
      });

      // Se a loja correspondente for encontrada, adicione os detalhes ao pedido
      if (store) {
        const orderWithStore = {
          uuid: order.uuid,
          clientName: order.clientName,
          address: order.address,
          description: order.description,
          orderNumber: order.orderNumber,
          clientCellphone: order.clientCellphone,
          latLngAddress: order.latLngAddress,
          price: order.price,
          typePayment: order.typePayment,
          status: order.status,
          store: {
            name: store.name,
            address: store.address,
            lat: store.lat,
            lng: store.lng,
          },
        };
        ordersWithStoreDetails.push(orderWithStore);
      } else {
        ordersWithStoreDetails.push(order); // Se não encontrar a loja, adicione o pedido sem os detalhes da loja
      }
    }

    return ordersWithStoreDetails;
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

    const calculateDistanceByStore = await this.calculateDistanceFromStore(
      createOrderDto.storeUuid,
      createOrderDto.latLngAddress,
    );

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

    const maxAttempts = 5;
    let attempt = 0;
    let accepted = false;
    const attemptedDeliverymen = [];

    while (attempt < maxAttempts && !accepted) {
      let activeDeliverymen = await this.deliverymanRepository.find({
        where: { isActive: true },
      });
      const availableDeliverymen = activeDeliverymen.filter(
        (dm) => !attemptedDeliverymen.includes(dm.uuid),
      );

      if (availableDeliverymen.length === 0) {
        // Se não houver entregadores disponíveis, saia do loop
        break;
      }
      const closestDeliveryman = await this.findDeliveryForOrder(
        createOrderDto.storeUuid,
        availableDeliverymen,
      );

      console.log(closestDeliveryman);
      if (closestDeliveryman) {
        const deliverymanSocketId =
          await this.orderGateway.deliverymanSocketsMap.get(
            closestDeliveryman.uuid,
          );

        if (deliverymanSocketId) {
          await this.orderGateway.handleNewOrder(deliverymanSocketId, newOrder);

          try {
            const result = await this.waitForDeliverymanResponse(
              deliverymanSocketId,
              newOrder.uuid,
            );

            if ((result as { response?: string }).response === 'accept') {
              console.log('Entregador aceitou o pedido');
              newOrder.status = ORDER_STATUS.RECEIVED;
              newOrder.acceptedByDeliveryman = 1;
              newOrder.deliverymanUuid = closestDeliveryman.uuid;
              await this.orderRepository.save(newOrder);
              accepted = true;
            } else {
              // Se o entregador recusou o pedido, remova-o da lista
              // e tente atribuir ao próximo entregador disponível
              activeDeliverymen = activeDeliverymen.filter(
                (dm) => dm.uuid !== closestDeliveryman.uuid,
              );
            }
          } catch {
            // Se houve um erro ao aguardar a resposta, tente com o próximo entregador
            attemptedDeliverymen.push(closestDeliveryman.uuid);
          }
        } else {
          // Se o ID do socket do entregador não estiver disponível, tente com o próximo entregador
          attemptedDeliverymen.push(closestDeliveryman.uuid);
        }
      } else {
        attemptedDeliverymen.push(closestDeliveryman.uuid);
      }
      attempt++;
    }

    if (!accepted) {
      throw new HttpException(
        'Nenhum entregador disponível no momento.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Função para aguardar a resposta do entregador
  async waitForDeliverymanResponse(deliverymanSocketId, orderUuid) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearInterval(interval);
        reject(new Error('Tempo limite para resposta do entregador excedido'));
      }, 60000);

      const interval = setInterval(() => {
        if (
          this.orderGateway.responsePromises[deliverymanSocketId] &&
          this.orderGateway.responsePromises[deliverymanSocketId].orderUuid ===
            orderUuid
        ) {
          clearTimeout(timeout);
          const response =
            this.orderGateway.responsePromises[deliverymanSocketId];
          resolve(response);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

  // função para encontrar o entregador mais próximo da loja
  async findDeliveryForOrder(
    storeUuid: string,
    availableDeliverymen: Deliveryman[] = [],
  ) {
    const store = await this.storeRepository.findOne({
      where: { uuid: storeUuid },
    });

    let closestDeliveryman: Deliveryman | null = null;
    let shortestDistance = Infinity;

    for (const deliveryman of availableDeliverymen) {
      const distance = await this.calculateDistance(
        store.lat,
        store.lng,
        deliveryman.lat,
        deliveryman.lng,
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
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

    const destinationCoords = JSON.parse(latLngEnd);
    const destinationLat = destinationCoords.lat;
    const destinationLng = destinationCoords.lng;

    // calculateDistance para calcular a distância
    const distance = await this.calculateDistance(
      store.lat,
      store.lng,
      destinationLat,
      destinationLng,
    );

    return distance;
  }
}
