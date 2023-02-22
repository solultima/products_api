import { Request, Response } from "express";
import { updateStock } from './database';
import { validate } from 'uuid';
// Endpoint to update the stock of a product
export const updateStockHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  const stock = req.body.stock;
  if (id && validate(id) && stock && typeof stock === 'number' && stock >= 0) {
    const updatedProduct = updateStock(id, stock);
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      res.status(404).send({ error: 'not able to update product' });
    }
  } else {
    res.status(400).send({ error: 'either id or stock missing or invalid' });
  }
};

