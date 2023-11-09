import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: { [key: string]: Socket } = {};

  deliverymanSocketsMap = new Map<string, string>(); // Inicialize o Map aqui
  responsePromises = new Map<string, string>();

  handleConnection(client: Socket): void {
    this.connectedClients[client.id] = client;

    // Lida com o evento 'join-deliveryman'
    client.on('join-deliveryman', (deliverymanUuid: string) => {
      // Registra o entregador associando o UUID ao ID do socket
      this.deliverymanSocketsMap.set(deliverymanUuid, client.id);
      console.log(`Entregador ${deliverymanUuid} se conectou`);
    });

    client.on('deliveryman-response', (data) => {
      this.responsePromises[data.socketId] = data;
    });
  }

  handleDisconnect(client: Socket): void {
    // Quando um entregador se desconecta, removemos seu socket da lista de clientes conectados.
    delete this.connectedClients[client.id];

    // Remova o entregador do mapeamento quando ele se desconectar
    this.deliverymanSocketsMap.forEach((socketId, uuid) => {
      if (socketId === client.id) {
        this.deliverymanSocketsMap.delete(uuid);
        console.log(`Entregador ${uuid} se desconectou.`);
      }
    });
  }

  @SubscribeMessage('locationDelivery')
  handleLocationUpdate(client: Socket, data: any): void {
    client.broadcast.emit('locationDelivery', data);
  }

  @SubscribeMessage('new-order')
  handleNewOrder(deliverymanSocketId: any, newOrder: any): void {
    const obj = {
      socketId: deliverymanSocketId,
      ...newOrder,
    };

    this.server.to(deliverymanSocketId).emit('new-order', obj);
  }
}
