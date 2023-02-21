import { Request, Response } from 'express';
import { createItem } from './database';
const createProduct = (req: Request, res: Response) => {
    console.log(req.body);
    Object.keys(req.headers).forEach(key => console.log(`${key} => ${req.headers[key]}`));
    Object.keys(req.query).forEach(key => console.log(`${key} => ${req.query[key]}`));
    const newID = createItem('product 3', 23, 23);
    res.send({ id: newID });
}

export {
    createProduct
}