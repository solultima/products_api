import { v4 } from 'uuid';
import { productModel } from './product.model';
import * as fs from 'fs';
// import * as path from 'path';

const dataFileName = './database/products.json';

const loadData = (): Array<productModel> => {
    const dataFile = dataFileName;
    if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile).toString());
    } else {
        return [];
    }
}

const saveData = (data: Array<productModel>): Array<productModel> => {
    const dataFile = dataFileName;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return loadData();
}

let products: Array<productModel> = loadData();

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
