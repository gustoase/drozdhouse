import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { MqttOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  await app.connectMicroservice<MqttOptions>({
    transport: Transport.MQTT,
    options: {
      url: config.get<string>('mqtt'),
    },
  });

  await app.startAllMicroservices();

  app.listen(3001);
}
bootstrap();
