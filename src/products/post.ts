import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { createItem } from './database';
const createProduct = (req: Request, res: Response) => {
    console.log(req.body);
    Object.keys(req.headers).forEach(key => console.log(`${key} => ${req.headers[key]}`));
    Object.keys(req.query).forEach(key => console.log(`${key} => ${req.query[key]}`));

    var urlencodedParser = bodyParser.urlencoded({ extended: false })
     const newID = createItem(' req.body.name', req.body.price, req.body.stock);
     res.send({ id: newID });
}

export {
    createProduct
}