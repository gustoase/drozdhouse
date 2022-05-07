import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { MqttOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice<MqttOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });

  await app.startAllMicroservices();

  app.listen(3001);
}
bootstrap();
