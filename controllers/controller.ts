import "reflect-metadata";
import {getConnection} from "typeorm";
import {User} from ".././entity/User";
import * as Hapi from '@hapi/hapi';


const hello: () => { msg: string;} = () => {
        return {msg: 'Hello Typscript'};
    }

const users: () => Promise<User[]> = () => {
        return getConnection().manager.find(User)
    }

const newuser = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {
        const { firstName, lastName, age } = request.payload as Partial<User>;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        await getConnection().manager.save(user);
        return user;
}



export default { hello, users, newuser };


