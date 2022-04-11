import "reflect-metadata";
import {getConnection, In} from "typeorm";
import {User} from ".././entity/User";
import * as Hapi from '@hapi/hapi';
import { Products } from "../entity/Products";
import { Tegs } from "../entity/Tegs";
import { number } from "@hapi/joi";
import {fakedata} from "./fakedata"


const hello: () => { msg: string;} = () => {
        return {msg: 'Hello Typscript'};
    }

const users: () => Promise<User[]> = async () => {
        return await getConnection().manager.find(User)
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


const setProduct = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {
        const { title, category, price } = request.payload as Partial<Products>;
        const proguct = new Products();
        proguct.title = title;
        proguct.category = category;
        proguct.price = price
        await getConnection().manager.save(proguct);
        return proguct;
    }

const setTeg = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {
    const { name } = request.payload as Partial<Tegs>;
    const teg = new Tegs();
    teg.name = name;
    await getConnection().manager.save(teg);
    return teg;
}

type relationTegs = {
    idProduct: number;
    idTegs: Array<string>;
}

const setProductTegs = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {
    const { idProduct, idTegs } = request.payload as relationTegs;
    const product = await getConnection().manager.findOne(Products, {id: idProduct});
    const tegs = [];
    for (let id of idTegs) {
        let idn = Number(id);
        tegs.push(await getConnection().manager.findOne(Tegs, {id: idn}));
        console.log(tegs);        
    };
    product.tegs = [...tegs];
    await getConnection().manager.save(product);
    return product;
}


const getProductsAndTegs = async () => {
    const products = await getConnection().manager.find(Products);
    const tegs = await getConnection().manager.find(Tegs);
    return [products, tegs];
}

const getProductsWithTegs = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {

    const { tegs } = request.payload as Partial<Products>;

    const Changedtegs = tegs.map(tegId => {
        const teg = Number(tegId);
        if ( teg !== NaN) {
            return teg;
        } else {
            return 0;
        }
    });

    try {  
    const productsDb = await getConnection()
        .getRepository(Products)
        .createQueryBuilder("products")
        .leftJoin("products.tegs","tegs")
        .where("tegs.id IN (:...id)", {id: Changedtegs})
        .groupBy("products.id")
        .having("COUNT(tegs.id) = :count", {count: Changedtegs.length})
        .getMany();
    return productsDb;
    
    } catch (e) {
        console.log('Возникла ошибка запроса к БД...');
        
    }
}

const fakeDataBaseIn = async () => {
    await getConnection().getRepository(Products).insert(fakedata.products);
    await getConnection().getRepository(Tegs).insert(fakedata.tegs);
    return { msg: 'Фейковая база данных создана'}
}


export default { hello, users, newuser, setProduct, setTeg, setProductTegs, getProductsAndTegs, getProductsWithTegs, fakeDataBaseIn };


