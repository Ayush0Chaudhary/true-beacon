import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';



@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NiftyPriceGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  private readonly logger = new Logger(NiftyPriceGateway.name);

  afterInit(client : Socket) {
    this.logger.log('Gateway Initialized');
    setInterval(() => {
        const price = Math.floor(Math.random() * 10000 + 23000);
        client.emit('price', {price: price});
        this.logger.log('Price sent: ' + price);  
    }, 3000);
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
