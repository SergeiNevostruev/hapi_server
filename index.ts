import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { init } from "./server"
import 'colors';
import { get } from 'node-emoji';

// typeorm test
// =====================================================================================

createConnection()
    .then(async connection => {
        console.log(get('book'),get('traffic_light'),'Соединение с базой данных устанловлено'.yellow);        
        // console.log("Inserting a new user into the database...");
        // const user = new User();
        // user.firstName = "Timber";
        // user.lastName = "Saw";
        // user.age = 25;
        // await connection.manager.save(user);
        // console.log("Saved a new user with id: " + user.id);

        // console.log("Loading users from the database...");
        // const users = await connection.manager.find(User);
        // console.log("Loaded users: ", users);

        // console.log("Here you can setup and run express/koa/any other framework.");

    }).catch(error => console.log(error));
// =====================================================================================



// errors
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit;
})
// =====================================================================================

// server start
init();