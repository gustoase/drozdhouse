import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZigbeeModule } from './zigbee/zigbee.module';
import { EventsModule } from './gateways/events.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '~/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ZigbeeModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
