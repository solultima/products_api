import { Request, Response } from 'express';
import { getProductByID, getProductsFromDB, getProductsUsingMongoose } from './database';
import { validate } from 'uuid';
import { getProducts } from './database';

const getListHandler = async (req: Request, res: Response) => {
    // const data = {
    //     ResponseData: await getProductsFromDB()
    //     // ResponseData: await getProductsUsingMongoose(),
    // }
    // res.setHeader('cache-control', 'public, max-age=30').send(data);
    res.send(await getProductsUsingMongoose());
}

const getProductByIDHandler = (req: Request, res: Response) => {
    const id = req.params.id;
    if (id && validate(id)) {
        const product = getProductByID(id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ error: 'not able to find the product with the provided id' });
        }
    } else {
        res.status(400).send({ error: 'invalid product id is provided' });
    }
}

export {
    getListHandler,
    getProductByIDHandler
}

