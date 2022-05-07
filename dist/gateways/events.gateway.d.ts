import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ModuleRef } from '@nestjs/core';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayInit {
    private moduleRef;
    private readonly logger;
    private readonly validator;
    constructor(moduleRef: ModuleRef);
    server: Server;
    afterInit(): void;
    handleConnection(socket: Socket): Promise<void>;
}
