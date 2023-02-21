import { Request, Response } from 'express';
import * as fs from 'fs';
import { productModel } from './product.model';

const dataFileName = './database/products.json';
const dataFile = dataFileName;


let products : productModel[] =JSON.parse(fs.readFileSync(dataFile).toString())

const findOneOfID = (id: String): productModel => {
    const toBeFound: productModel = products.find(t => t.id === id)!;
    return toBeFound;
  }



const getProductByID = (req: Request, res: Response) => {
    const id = req.params.id;
    let targetid = findOneOfID(id);
    res.json({targetid })
}

export {
   
    getProductByID
}