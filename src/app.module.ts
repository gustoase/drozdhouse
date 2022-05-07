import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZigbeeModule } from './zigbee/zigbee.module';
import { EventsModule } from './gateways/events.module';

@Module({
  imports: [ZigbeeModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
