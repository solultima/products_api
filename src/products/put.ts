import { Request, Response } from "express";
import { updateStock, updatePrice } from './database';
import { validate } from 'uuid';

// Endpoint to update the stock of a product
export const updateStockHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  const stock = req.body.stock;
  const updatedProduct = updateStock(id, stock);
  if (updatedProduct) {
    res.send(updatedProduct);
  } else {
    res.status(404).send({ error: 'not able to update product' });
  }
};


// Endpoint to update the price of a product
export const updatePriceHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  const price = req.body.price;
  if (id && validate(id) && price && typeof price === 'number' && price > 0) {
    const updatedProduct = updatePrice(id, price);
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      res.status(404).send({ error: 'not able to update product' });
    }
  } else {
    res.status(400).send({ error: 'either id or stock missing or invalid' });
  }
};