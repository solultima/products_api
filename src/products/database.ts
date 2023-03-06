import * as fs from 'fs';
import { v4 } from 'uuid';

import { ProductModel } from './models/product.model';

const dataFileName = './database/products.json';

export const findOneOfID = (id: string): ProductModel | undefined => {
  const toBeFound: ProductModel | undefined = products.find((t) => t._id === id);
  return toBeFound;
};

const loadData = (): Array<ProductModel> => {
  const dataFile = dataFileName;
  if (fs.existsSync(dataFile)) {
    return JSON.parse(fs.readFileSync(dataFile).toString());
  } else {
    return [];
  }
};

const products: Array<ProductModel> = loadData();

const saveData = (data: Array<ProductModel>): Array<ProductModel> => {
  const dataFile = dataFileName;
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  return loadData();
};

const getProductIndexByID = (id: string) => {
  const product = getProductByID(id);
  if (product) {
    return products.indexOf(product);
  } else {
    return -1;
  }
};

export const getProductByID = (id: string) => {
  return products.find((product) => product._id === id);
};

export const createItem = (name: string, price: number, stock: number) => {
  const newID = v4();
  const item: ProductModel = {
    _id: newID,
    name,
    price,
    stock,
  };

  products.push(item);
  saveData(products);
  return newID;
};

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
};

export const updatePrice = (id: string, price: number) => {
  const product = getProductByID(id);
  if (product) {
    product.price = price;
    if (saveData(products)) {
      return product;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const deleteProduct = (id: string) => {
  const index = getProductIndexByID(id);
  if (index >= 0) {
    const isDeleted = products.splice(index, 1).length > 0;
    saveData(products);
    return isDeleted;
  } else {
    return null;
  }
};

export const getProducts = () => {
  return products;
};
