import { Request, Response } from 'express';
import { validate } from 'uuid';

import { ProductDatabase } from '../database.mongo';

export const deleteProductHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id && validate(id)) {
    const isDeleted = await ProductDatabase.deleteProduct(id);
    if (isDeleted) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: 'not able to delete product' });
    }
  } else {
    res.status(400).send({ error: 'invalid product id' });
  }
};
