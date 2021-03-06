import { ArgumentMetadata } from '@nestjs/common';

export type TWsAction = {
  targetClass: object;
  actionName: string;
  moduleName: string;
  handler: (payload: any) => Promise<any>;
  context?: any;
  metadata?: ArgumentMetadata;
};
