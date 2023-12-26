import { Module } from '@nestjs/common';

import { CustomLogger } from './custom-logger.service';

@Module({
    controllers: [],
    providers: [CustomLogger],
    exports: [CustomLogger],
})
export class LoggerModule {}
