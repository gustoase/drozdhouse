import { ClientMqtt } from '@nestjs/microservices';
export declare class MqttController {
    private client;
    constructor(client: ClientMqtt);
    private tempFunction;
    private button1Set;
    private tempFunctio2n;
    send(): number;
}
