import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'Socket.IO';

@WebSocketGateway({
    cors: {
        origin: '*', // можно указать `*` для отключения `CORS`
    },
    serveClient: false,
    // название пространства может быть любым, но должно учитываться на клиенте
    namespace: 'chat',
})
export class ChatAppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;
    afterInit(server: Server) {
        console.log(server);
    }

    // подключение
    handleConnection(client: Socket, ...args: any[]) {
        // обратите внимание на структуру объекта `handshake`
        const userName = client.handshake.query.userName as string;
        // const socketId = client.id;
        // users[socketId] = userName;

        // передаем информацию всем клиентам, кроме текущего
        client.broadcast.emit('log', `${userName} connected`);
    }

    // отключение
    handleDisconnect(client: Socket) {
        const socketId = client.id;
        const userName = socketId;
        // delete users[socketId];

        client.broadcast.emit('log', `${userName} disconnected`);
    }
    // @SubscribeMessage('message')
    // handleMessage(client: any, payload: any): string {
    //     return 'Hello world!';
    // }
}
