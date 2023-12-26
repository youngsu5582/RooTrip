import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { Handlers, init, Integrations } from '@sentry/node';

import { AppModule } from './app.module';
import { SetnryConfigService } from './lib/config/sentry.config.service';
import { ServerConfigService } from './lib/config/server.config.service';
import { CustomLogger } from './lib/logger/custom-logger.service';

export class Application {
    private application: NestExpressApplication;

    public async open(): Promise<void> {
        this.application = await NestFactory.create(AppModule, new ExpressAdapter(), { cors: true, logger: new CustomLogger() });
        const serverConfigService = this.application.get(ServerConfigService);

        this.application.enableCors();
        this.application.setGlobalPrefix('api');

        this.initSentry(this.application);

        await this.application.listen(serverConfigService.port);
        Logger.log(`Server ${serverConfigService.development} running on port ${serverConfigService.port}`, 'START');
        process.on('SIGINT', async () => {
            await this.close();
            process.exit(0);
        });
    }
    private initSentry(application: NestExpressApplication) {
        const setnryConfigService = application.get<SetnryConfigService>(SetnryConfigService)!;
        init({
            dsn: setnryConfigService.dsn,
            attachStacktrace: true,
            integrations: [
                new Integrations.Http({ tracing: true }),
                new Integrations.Express({ app: application.getHttpAdapter().getInstance() }),
            ],
        });
        application.use(Handlers.requestHandler());
        application.use(Handlers.tracingHandler());
    }

    private async close(): Promise<void> {
        if (this.application === undefined) return;
        await this.application.close();
    }
}

const bootstrap = new Application();
void bootstrap.open();
