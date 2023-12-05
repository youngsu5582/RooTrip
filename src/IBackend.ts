import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { IModule } from './IModule';
import { IConfiguration } from './IConfiguration';

export class MyBackend {
  private application_?: NestFastifyApplication;

  public async open(): Promise<void> {
    this.application_ = await NestFactory.create(
      IModule,
      new FastifyAdapter(),
      { logger: false },
    );

    this.application_.enableCors();
    this.application_.setGlobalPrefix('api');
    await this.application_.listen(IConfiguration.API_PORT);

    process.on('SIGINT', async () => {
      await this.close();
      process.exit(0);
    });
  }

  private async close(): Promise<void> {
    if (this.application_ === undefined) return;

    // DO CLOSE
    await this.application_.close();
    delete this.application_;
  }
}

const bootstrap = new MyBackend();
bootstrap.open();
