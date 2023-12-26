import { inspect } from 'util';

import { ConsoleLogger, Injectable } from '@nestjs/common';
import { addBreadcrumb } from '@sentry/node';
import { id } from 'cls-rtracer';

@Injectable()
export class CustomLogger extends ConsoleLogger {
    verbose(message: unknown, context?: string): void {
        const convertedMessage = this.stringify(message);
        super.verbose(convertedMessage, this.appendTraceId(context));
        addBreadcrumb({
            message: convertedMessage,
            level: 'info',
        });
    }

    debug(message: unknown, context?: string): void {
        const convertedMessage = this.stringify(message);
        super.debug(convertedMessage, this.appendTraceId(context));
        addBreadcrumb({
            message: convertedMessage,
            level: 'debug',
        });
    }

    log(message: unknown, context?: string): void {
        const convertedMessage = this.stringify(message);
        super.log(convertedMessage, this.appendTraceId(context));
        addBreadcrumb({
            message: convertedMessage,
            level: 'log',
        });
    }

    warn(message: unknown, context?: string): void {
        const convertedMessage = this.stringify(message);
        super.warn(convertedMessage, this.appendTraceId(context));
        addBreadcrumb({
            message: convertedMessage,
            level: 'warning',
        });
    }

    error(message: unknown, stack?: string, context?: string): void {
        const convertedMessage = this.stringify(message);
        super.error(convertedMessage, stack, this.appendTraceId(context));
        addBreadcrumb({
            message: convertedMessage,
            level: 'error',
        });
    }

    private appendTraceId(context?: string) {
        return [context, id()].filter(Boolean).join(' ');
    }

    private stringify(message: unknown): string {
        if (typeof message === 'object') {
            return inspect(message, {
                breakLength: Number.POSITIVE_INFINITY,
            });
        }
        return `${message}`;
    }
}
