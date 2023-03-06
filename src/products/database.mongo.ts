import { Common } from '../common';
import { ProductModel, Products } from './models';

const getProducts = async (page: number, size: number) => {
  return Common.Mongo.getConnection().then(async () => {
    const data = await Products.find<ProductModel>({}, {}, { skip: (page - 1) * size, limit: size });
    const total = await Products.collection.estimatedDocumentCount();
    return { data, total };
  });
};

const getProductByID = async (id: string) => {
  return Common.Mongo.getConnection().then(async () => {
    const data = await Products.findById(id);
    console.log(data);
    return data;
  });
};

const deleteProduct = async (id: string) => {
  return Common.Mongo.getConnection().then(async () => {
    const data = await Products.findByIdAndRemove(id);
    return data;
  });
};

const updateProductStock = async (id: string, stock: number) => {
  return Common.Mongo.getConnection().then(async () => {
    const data = await Products.findByIdAndUpdate(id, { $set: { stock } });
    return data;
  });
};

const updateProductPrice = async (id: string, price: number) => {
  return Common.Mongo.getConnection().then(async () => {
    const data = await Products.findByIdAndUpdate(id, { $set: { price } });
    return data;
  });
};

const createProduct = async (product: ProductModel) => {
  return Common.Mongo.getConnection()
    .then(async () => {
      const newProduct = new Products(product);
      return newProduct.save().then((doc) => {
        return doc._id;
      });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return null;
      }
    });
};

export const ProductDatabase = {
  getProducts,
  getProductByID,
  createProduct,
  deleteProduct,
  updateProductPrice,
  updateProductStock,
};
