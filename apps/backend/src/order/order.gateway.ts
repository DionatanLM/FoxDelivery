import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  private connectedClients: { [key: string]: Socket } = {};

  handleConnection(client: Socket): void {
    // Quando um entregador se conecta, armazenamos seu socket em um objeto para referência posterior.
    this.connectedClients[client.id] = client;
    //console.log(`Entregador ${client.id} conectado.`);

    // Aqui você pode realizar ações adicionais quando um entregador se conecta, como autenticação, verificação de identidade, etc.
  }

  handleDisconnect(client: Socket): void {
    // Quando um entregador se desconecta, removemos seu socket da lista de clientes conectados.
    delete this.connectedClients[client.id];
    //console.log(`Entregador ${client.id} desconectado.`);
  }

  @SubscribeMessage('locationDelivery')
  handleLocationUpdate(client: Socket, data: any): void {
    console.log(`Entregador ${client.id} ${data.latitude} ${data.longitude}`);
    client.broadcast.emit('locationDelivery', data);
  }
}
