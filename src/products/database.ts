import { v4 } from 'uuid';
import { productModel } from './product.model';
import * as fs from 'fs';

const dataFileName = './database/products.json';


export const findOneOfID = (id: String): productModel => {
    const toBeFound: productModel = products.find(t => t.id === id)!;
    return toBeFound;
  }
const loadData = (): Array<productModel> => {
    const dataFile = dataFileName;
    if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile).toString());
    } else {
        return [];
    }
}

let products: Array<productModel> = loadData();

const saveData = (data: Array<productModel>): Array<productModel> => {
    const dataFile = dataFileName;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return loadData();
}

export const getProductByID = (id: string) => {
    return products.find((product) => product.id === id);
}

export const createItem = (name: string, price: number, stock: number) => {
    let newID = v4();
    let item: productModel = {
        id: newID,
        name,
        price,
        stock
    }

    products.push(item);
    saveData(products);
    return newID;
}

export const updateStock = (id: string, stock: number) => {
    const product = getProductByID(id);
    if (product) {
        product.stock = stock;
        if (saveData(products)) {
            return product;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

