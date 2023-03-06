import { Request, Response } from 'express';

import { ProductDatabase } from '../database.mongo';

// Endpoint to update the stock of a product
export const updateStockHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const stock = req.body.stock;

  const updatedProduct = await ProductDatabase.updateProductStock(id, stock);
  if (updatedProduct) {
    res.send(updatedProduct);
  } else {
    res.status(404).send({ error: 'not able to update product' });
  }
};

// Endpoint to update the price of a product
export const updatePriceHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const price = req.body.price;

  const updatedProduct = await ProductDatabase.updateProductPrice(id, price);
  if (updatedProduct) {
    res.send(updatedProduct);
  } else {
    res.status(404).send({ error: 'not able to update product' });
  }
};
