
import { WebSocketGateway, SubscribeMessage, MessageBody,WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { CreateWDto } from './dto/create-w.dto';
import { UpdateWDto } from './dto/update-w.dto';
import { APP_CONF } from 'src/core/config';
import {Server} from 'ws'
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { WsResponseInterceptor } from 'src/core/interceptors/WsResponse.interceptor';
import { NormalizeResponse } from 'src/core/normalize';
import { WsException } from 'src/core/filter';
import { IncomingMessage } from 'http';

@UseInterceptors(new WsResponseInterceptor)
@UseFilters(new WsException)
@WebSocketGateway(APP_CONF().ws.port,{transports:['websocket']})
export class WsGateway implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit  {

  @WebSocketServer()
  server:Server

  constructor( private readonly wsService: WsService) {
  }
  afterInit() {
    console.log('WebSocket server initialized',);
   }
  async handleConnection(client:WebSocket,message:IncomingMessage) {
    return client.send(JSON.stringify(NormalizeResponse.success('连接成功')))
  }
  async handleDisconnect(client:WebSocket,) {
    console.log(`Client disconnected:`,);
  }




  @SubscribeMessage('createW')
  create(@MessageBody() createWDto: {event:string}) {
    return this.wsService.create(createWDto);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data:number) {
    console.log(  this.server)
    return this.wsService.findAll();
  }

  @SubscribeMessage('findOneW')
  findOne(@MessageBody() id: number) {
    return this.wsService.findOne(id);
  }

  @SubscribeMessage('updateW')
  update(@MessageBody() updateWDto: UpdateWDto) {
    return this.wsService.update(updateWDto.id, updateWDto);
  }

  @SubscribeMessage('removeW')
  remove(@MessageBody() id: number) {
    return this.wsService.remove(id);
  }
}
