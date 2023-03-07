import { Request, Response } from 'express';
import { validate } from 'uuid';

import { ProductDatabase } from '../database.mongo';

const getListHandler = async (req: Request, res: Response) => {
  const { page = 1, size = 3 } = req.query;
  const result = await ProductDatabase.getProducts(
    typeof page === 'number' ? page : Number(page),
    typeof size === 'number' ? size : Number(size)
  );

  res.send({
    pageNumber: typeof page === 'number' ? page : Number(page),
    pageSize: typeof size === 'number' ? size : Number(size),
    pageItemCount: result.data.length,
    totalItemCount: result.total,
    items: result.data,
  });
};

const getProductByIDHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id && validate(id)) {
    const product = await ProductDatabase.getProductByID(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ error: 'not able to find the product with the provided id' });
    }
  } else {
    res.status(400).send({ error: 'invalid product id is provided' });
  }
};

export { getListHandler, getProductByIDHandler };
