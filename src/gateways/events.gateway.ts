import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  GatewayMetadata,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import EventsService from './events.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import validationConfig from '../config/validation.config';

@WebSocketGateway<GatewayMetadata>({
  transports: ['websocket', 'polling'],
  path: '/ws',
})
export class EventsGateway implements OnGatewayConnection, OnGatewayInit {
  private readonly logger = new Logger(EventsGateway.name);
  private readonly validator = new ValidationPipe(validationConfig);

  constructor(private moduleRef: ModuleRef) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    EventsService.events.forEach((action) => {
      // Получаем контекст  конкретного инициализированного класса где вызван был декоратор
      action.context = this.moduleRef.get(action.targetClass.constructor, {
        strict: false,
      });
      this.logger.log(
        `Add WS action: ${action.targetClass.constructor.name} => ${action.moduleName}:${action.actionName}`,
      );
    });
  }

  async handleConnection(socket: Socket): Promise<void> {
    EventsService.events.forEach((action) => {
      socket.on(
        `${action.moduleName}:${action.actionName}`,
        async (payload: any, response: (data: any) => void) => {
          try {
            const handler = action.handler.bind(action.context);
            const data = { ...payload };
            delete data.id;

            if (action.metadata) {
              await this.validator.transform(data, action.metadata);
            }

            const result =
              action.actionName === 'update'
                ? await handler(payload.id, data, socket)
                : await handler(payload, socket);

            response({ status: 'success', data: result });
          } catch (e) {
            response({ status: 'error', data: e });
          }
        },
      );
    });

    // пример передачи на фронт конфига с сервера
    socket.emit('ready', { date: new Date() });
  }
}
