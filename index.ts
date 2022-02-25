//import hapi
import * as Hapi from '@hapi/hapi';
import {Server, ResponseToolkit, Request} from 'hapi';
import 'colors';
import { get } from 'node-emoji';
// import swagger
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
// import type orm
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

// typeorm
// =====================================================================================

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));


// =====================================================================================




// options swagger
// =====================================================================================
const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: 'Test API Documentation'
    }
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
        plugin: Inert
    },
    {
        plugin: Vision
    },
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
];
// =====================================================================================


// handlers
const hello = () => {
    return {msg: 'Hello Typscript'};
}

// server
// =====================================================================================
const init = async (): Promise<void> => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register(plugins);

    server.route({
        method: 'GET',
        path: '/',        
        options: {
            handler: hello,
            description: 'Get Hello',
            notes: 'Returns Hello Typescript',
            tags: ['api'], 
        }
    })

    await server.start().then(() => console.log(get('rocket'),get('computer'),`Server started on ${server.info.uri}`.yellow)
    )
};

// errors
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit;
})
// =====================================================================================

// server start
init();