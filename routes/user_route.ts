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


];