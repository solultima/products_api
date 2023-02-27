import { Request, Response } from "express";
import { DeleteProductsUsingMongoose } from './database';
import { validate } from 'uuid';
import { request } from "http";
 const deleteProductHandler = async (req: Request, res: Response) => {
  const id = req.params._id;
  res.send(await DeleteProductsUsingMongoose(id));
};

export{
  deleteProductHandler
}