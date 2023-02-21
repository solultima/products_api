import { Request, Response } from 'express';
import { getProductByID } from './database';

const getListHandler = (req: Request, res: Response) => {
    res.send({products});
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

