import { Module } from '@nestjs/common';
import { MqttController } from './mqtt/mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.get<string>('mqtt'),
            serializer: {
              serialize(value: { data: any }): any {
                return value.data;
              },
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [],
  controllers: [MqttController],
})
export class ZigbeeModule {}
