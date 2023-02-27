import { Request, Response } from 'express';
import { getProductByIdUsingMongoose, getProductsUsingMongoose } from './database';
import { validate } from 'uuid';
 import { getProducts } from './database';

const getListHandler = async (req: Request, res: Response) => {
    // const data = {
    //     ResponseData: await getProductsFromDB()
    //     ResponseData: await getProductsUsingMongoose(),
    // }
    // res.setHeader('cache-control', 'public, max-age=30').send(data);
    res.send(await getProductsUsingMongoose());
}

const getProductByIDHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const data = await getProductByIdUsingMongoose(id);
        res.send(data);
        } 
    catch {
        res.status(400).send({ error: 'invalid product id is provided' });
    };
}


export {
    getListHandler,
    getProductByIDHandler
}

