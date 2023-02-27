// import { v4 } from 'uuid';
import { ProductModel, Products } from './product.model';
import * as fs from 'fs';
import { getClient } from './mongo';
import { getConnection } from './mongoose';

const dataFileName = './database/products.json';

export const findOneOfID = (id: String): ProductModel => {
    const toBeFound: ProductModel = products.find(t => t.id === id)!;
    return toBeFound;
}

const loadData = (): Array<ProductModel> => {
    const dataFile = dataFileName;
    if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile).toString());
    } else {
        return [];
    }
}

let products: Array<ProductModel> = loadData();

const saveData = (data: Array<ProductModel>): Array<ProductModel> => {
    const dataFile = dataFileName;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return loadData();
}

export const getProductByID = (id: string) => {
    return products.find((product) => product.id === id);
}

const getProductIndexByID = (id: string) => {
    const product = getProductByID(id);
    if (product) {
        return products.indexOf(product);
    } else {
        return -1
    }
}

// export const createItem = (name: string, price: number, stock: number) => {
//     let newID = v4();
//     let item: ProductModel = {
//         id: newID,
//         name,
//         price,
//         stock
//     }

//     products.push(item);
//     saveData(products);
//     return newID;
// }

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

// export const updatePrice = (id: string, price: number) => {
//     const product = getProductByID(id);
//     if (product) {
//         product.price = price;
//         if (saveData(products)) {
//             return product;
//         } else {
//             return null;
//         }
//     } else {
//         return null;
//     }
// }

// export const deleteProduct = (id: string) => {
//     const index = getProductIndexByID(id);
//     if (index >= 0) {
//         const isDeleted = products.splice(index, 1).length > 0
//         saveData(products);
//         return isDeleted;
//     } else {
//         return null
//     }
// }

export const getProducts = () => {
    return products;
}

export const getProductsFromDB = async () => {
    return getClient()
        .then(async (client) => {
            const data = await client.db('products_api_data').collection('products')
            .find<ProductModel>({}, {
                limit: 5,
                skip: 0
            }).toArray();
            return data;
        });
}

export const getProductsUsingMongoose = async () => {
    return getConnection()
        .then(async () => {
            const data = await Products.find<ProductModel>({}, {}, { limit: 20, skip: 0 });
            console.log(data);
            return data;
        });
}

export const getProductByIdUsingMongoose = async (id: any) => {
    return getConnection()
    .then(async () => {
        const product_id = await Products.findById(id);
        return product_id;
    })
}

export const deleteProduct = async (id: any) => {
    return getConnection()
    .then(async () => {
        const deletedData = await Products.findByIdAndDelete(id);
    })
}

export const createItem = async (name: string, price: number, stock: number) => {
    return getConnection()
    .then(async () => {
        const data = new Products({
            name,
            price,
            stock
        })
        Products.insertMany(data);
    })
}



    