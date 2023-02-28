import { Request, Response } from "express";
import { updateStockUsingMongoose, updatePriceUsingMongoose } from './database';
import { validate } from 'uuid';
import {Products, ProductModel } from './product.model';
// Endpoint to update the stock of a product
export const updateStockHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const stock = req.body.stock;
  const updatedProduct = await updateStockUsingMongoose(id,stock);
  if (updatedProduct) {
    res.send(updatedProduct);
  } else {
    res.status(404).send({ error: 'not able to update product' });
  }
};

// Import the Mongoose model for products

/*export const updateStockHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stock } = req.body;
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      res.status(404).send({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
};*/

/*import { updateStockValidator } from './validators';

export const updateStockHandle= async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stock } = req.body;
    try {
        // Call the updateStockValidator middleware
        updateStockValidator(req, res, async () => {
            const updatedProduct = await Products.findByIdAndUpdate(
                id,
                { stock },
                { new: true }
            );
            if (updatedProduct) {
                res.send(updatedProduct);
            } else {
                res.status(404).send({ error: 'Product not found' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
};

*/

// Endpoint to update the price of a product
export const updatePriceHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const price = req.body.price;
  const updatedProduct = await updatePriceUsingMongoose(id,price);
  if (updatedProduct) {
    res.send(updatedProduct);
  } else {
    res.status(404).send({ error: 'not able to update product' });
  }
};