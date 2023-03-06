import { Request, Response } from 'express';

import { ProductDatabase } from '../database.mongo';

const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  if (name && price && typeof price === 'number' && price > 0 && stock && typeof stock === 'number' && stock >= 0) {
    const newID = await ProductDatabase.createProduct({ name, price, stock });
    console.log(newID);
    if (newID) {
      res.send({ id: newID });
    } else {
      res.status(409).send({ error: 'product with same name already exist' });
    }
  } else {
    res.status(400).send({ error: 'invalid infomation provided for the product' });
  }
};

export { createProduct };
