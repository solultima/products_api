import { Request, Response } from 'express';
import { createItem } from './database';

const createProduct = (req: Request, res: Response) => {
    const newID = createItem('product 3', 23, 23);
    res.send({ id: newID });
}

export {
    createProduct
}