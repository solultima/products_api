import * as fs from 'fs';
import { Request, Response } from "express";
import { productModel }  from './product.model';

const dataFileName = './database/products.json';
const dataFile = dataFileName;
let products: productModel[]= JSON.parse(fs.readFileSync(dataFile).toString());

const findOneOfID = (id: String): productModel => {
    const toBeFound: productModel = products.find(t => t.id === id)!;
    return toBeFound;
  }

const deleteproduct = ( req: Request ,  res : Response) => {

    const id = req.params.id;
    const toBeDeleted = findOneOfID(id);
    if (!toBeDeleted) {
      res.status(404).json({ message: "Not Found!" });
    } else {
      products = products.filter(t => t.id !== id);
      res.json({ message: "Deleted Successfully", transaction: toBeDeleted });
    }
    fs.writeFileSync(dataFile , JSON.stringify(products, null, 2));

};          

export { deleteproduct } 