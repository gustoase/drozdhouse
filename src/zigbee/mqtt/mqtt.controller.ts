import { Controller, Get } from '@nestjs/common';
import {
  ClientMqtt,
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { WsAction } from '~/gateways/events.decorator';

@Injectable()
@Controller('mqtt')
export class MqttController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientMqtt) {
    client.emit('zigbee2mqtt/switch1/set', { state: 'TOGGLE' });
  }

  @MessagePattern('zigbee2mqtt/#')
  private tempFunction(@Ctx() context: MqttContext, @Payload() data) {
    console.log('zigbee2mqtt:', data);

    if (data.hasOwnProperty('action')) {
      console.log('ACTION', data.action);
    }

    // this.eventsGateway.server.emit('mqtt', data);

    // this.mqttService.subscribe('zigbee2mqtt/bridge/devices', {});
  }

  @MessagePattern('zigbee2mqtt/button1')
  private button1Set(@Ctx() context: MqttContext, @Payload() data) {
    this.client.emit('zigbee2mqtt/switch1/set', { state: 'TOGGLE' });
  }

  @MessagePattern('zigbee2mqtt/bridge/devices')
  private tempFunctio2n(@Ctx() context: MqttContext, @Payload() data) {
    console.log('zigbee2mqtt_devices:', data[1].definition.exposes[0]);
  }

  @Get()
  @WsAction('zigbee')
  send(): number {
    this.client.emit('zigbee2mqtt/switch1/set', { state: 'TOGGLE' });
    return 1;
  }
}
