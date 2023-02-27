import { Request, Response } from "express";
import { deleteProduct } from './database';
import { validate } from 'uuid';

// export const deleteProductHandler = (req: Request, res: Response) => {
//   const id = req.params.id;

//   if (id && validate(id)) {
//     const isDeleted = deleteProduct(id);
//     if (isDeleted) {
//       res.send({ success: true });
//     }
//     else {
//       res.status(404).send({ error: 'not able to delete product' });
//     }
//   }
//   else {
//     res.status(400).send({ error: 'invalid product id' });
//   }
// };

export const deleteProductHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
      const data = await deleteProduct(id);
      res.send("Product deleted succesfully");
      } 
  catch {
      res.status(400).send({ error: 'invalid product id is provided' });
  };
}
