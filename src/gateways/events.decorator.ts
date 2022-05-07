import EventsService from './events.service';
import { ArgumentMetadata } from '@nestjs/common';

export const WsAction = (
  moduleName: string,
  metadata?: ArgumentMetadata,
): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    EventsService.add({
      targetClass: target,
      actionName: propertyKey.toString(),
      moduleName: moduleName,
      handler: descriptor.value,
      metadata,
    });

    return descriptor;
  };
};
