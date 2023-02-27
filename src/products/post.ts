import { Request, Response } from 'express';
import { createItem } from './database';

// const createProduct = (req: Request, res: Response) => {
//     const name = req.body.name;
//     const price = req.body.price;
//     const stock = req.body.stock;
//     if (name && price && typeof price === 'number' && price > 0 && stock && typeof stock === 'number' && stock >= 0) {
//         const newID = createItem(name, price, stock);
//         if (newID) {    
//             res.send({ id: newID });
//         } else {
//             res.status(409).send({ error: 'product with same name already exist' });
//         }
//     } else {
//         res.status(400).send({ error: 'invalid infomation provided for the product' });
//     }
// }

const createProduct = async (req: Request, res: Response) => {
    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;
    try {
        const data = await createItem(name, price, stock);
        res.send("Product created succesfully");
        } 
    catch {
        res.status(400).send({ error: 'invalid information provided' });
    };
  }

export {
    createProduct
}