import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OrderGateway {
  private users = {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.users[client.id] = { name: 'Dionatan', email: 'dionatan@gmail.com' };
    //console.log(this.users);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    client.emit('receive-message', payload);

    client.broadcast.emit('receive-message', payload);
  }
}
