import { Model, model, Schema } from 'mongoose';
import * as uuid from 'uuid';

import { BaseModel } from '../../common/models';

type ProductModel = BaseModel & {
  name: string;
  price: number;
  stock: number;
};

const ProductSchema = new Schema({
  _id: {
    type: String,
    default: () => uuid.v4(),
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Products: Model<ProductModel> = model<ProductModel>('product', ProductSchema);

export { Products, ProductModel, ProductSchema };
