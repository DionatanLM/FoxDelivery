import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  private connectedClients: { [key: string]: Socket } = {};

  handleConnection(client: Socket): void {
    // Quando um entregador se conecta, armazenamos seu socket em um objeto para referência posterior.
    this.connectedClients[client.id] = client;
    console.log(`Entregador ${client.id} conectado.`);

    // Aqui você pode realizar ações adicionais quando um entregador se conecta, como autenticação, verificação de identidade, etc.
  }

  handleDisconnect(client: Socket): void {
    // Quando um entregador se desconecta, removemos seu socket da lista de clientes conectados.
    delete this.connectedClients[client.id];
    console.log(`Entregador ${client.id} desconectado.`);
  }

  @SubscribeMessage('locationDelivery')
  handleLocationUpdate(client: Socket, data: any): void {
    // Este método é chamado quando o aplicativo do entregador envia uma atualização de localização.

    // Você pode realizar ações aqui com base nos dados da atualização de localização.
    // Por exemplo, você pode armazenar as atualizações em um banco de dados, notificar o restaurante, etc.

    // Transmita a atualização de localização para outros clientes conectados, como o painel do restaurante.
    // Você pode usar client.broadcast.emit(...) para transmitir para todos os outros clientes, exceto o remetente.
    console.log(`Entregador ${data.id} enviou uma atualização de localização.`)
    console.log(data, 'data')
    client.broadcast.emit('locationDelivery', data);
  }
}
