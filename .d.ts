declare module 'next/dist/server/web/sse' {
    import { IncomingMessage, ServerResponse } from 'http';

    export class ServerSentEmitter {
        constructor(req: IncomingMessage, res: ServerResponse);
        send(event: string, data: any): void;
    }
}