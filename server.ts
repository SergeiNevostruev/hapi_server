//import hapi
import * as Hapi from '@hapi/hapi';
import {Server, ResponseToolkit, Request} from 'hapi';
import 'colors';
import { get } from 'node-emoji';
import { plugins } from './swagger'
import user_route from './routes/user_route'


// server
// =====================================================================================
export const init = async (): Promise<void> => {
    const server = Hapi.server({
        port: 8080,
        host: '0.0.0.0',
    });

    await server.register(plugins);

    server.route(user_route);

    await server.start().then(() => console.log(get('rocket'),get('computer'),`Сервер запущен на ${server.info.uri}`.yellow)
    )
};
