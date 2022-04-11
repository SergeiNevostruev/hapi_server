import "reflect-metadata";
import {createConnection} from "typeorm";
import { init } from "./server"
import 'colors';
import { get } from 'node-emoji';

// typeorm connection
// =====================================================================================

createConnection()
    .then(async connection => {
        console.log(get('book'),get('traffic_light'),'Соединение с базой данных установлено'.yellow);        
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