import { Module } from '@nestjs/common';
import { MqttController } from './mqtt/mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
          serializer: {
            serialize(value: { data: any }): any {
              return value.data;
            },
          },
        },
      },
    ]),
  ],
  providers: [],
  controllers: [MqttController],
})
export class ZigbeeModule {}
