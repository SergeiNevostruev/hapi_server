import handlers from '.././controllers/controller';
import Joi  from 'joi';


export default [

    {
        method: 'GET',
        path: '/',        
        options: {
            handler: handlers.hello,
            description: 'Get Hello',
            notes: 'Returns Hello Typescript',
            tags: ['api'], 
        }
    },

    {
        method: 'GET',
        path: '/users',        
        options: {
            handler: handlers.users,
            description: 'Get users of database',
            notes: 'Returns object with users',
            tags: ['api'], 
        }
    },

    {
        method: 'POST',
        path: '/newuser',        
        options: {
            handler: handlers.newuser,
            description: 'Get users of database',
            notes: 'Returns object with users',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    age: Joi.number()
                }) 
            }
        }
    },


    {
        method: 'POST',
        path: '/product',        
        options: {
            handler: handlers.setProduct,
            description: 'Set product of database',
            notes: 'return the added object',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string(),
                    category: Joi.string(),
                    price: Joi.number(),
                }) 
            }
        }
    },

    {
        method: 'POST',
        path: '/teg',        
        options: {
            handler: handlers.setTeg,
            description: 'Set teg of database',
            notes: 'return the added teg',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    name: Joi.string(),
                }) 
            }
        }
    },

    {
        method: 'POST',
        path: '/protuctsettegs',        
        options: {
            handler: handlers.setProductTegs,
            description: 'Set tegs for product of database',
            notes: 'return product with tegs',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    idProduct: Joi.number(),
                    idTegs: Joi.array(),
                }) 
            }
        }
    },

    {
        method: 'POST',
        path: '/protuctwithtegs',        
        options: {
            handler: handlers.getProductsWithTegs,
            description: 'Get found products with tegs',
            notes: 'return found products with tegs',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    tegs: Joi.array(),
                }) 
            }
        }
    },


    {
        method: 'GET',
        path: '/protuctsandtegs',        
        options: {
            handler: handlers.getProductsAndTegs,
            description: 'Get tegs and product of database',
            notes: 'return products and tegs',
            tags: ['api'],
        }
    },

    {
        method: 'GET',
        path: '/fakedata',        
        options: {
            handler: handlers.fakeDataBaseIn,
            description: 'Create fake DB for test',
            notes: 'return messege about Create DB',
            tags: ['api'],
        }
    }


];