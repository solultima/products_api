import { Schema, model, Model } from 'mongoose'

interface ProductModel {
    id?: string;
    name: string;
    price: number;
    stock: number
}

const ProductSchema = new Schema({
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
    }
});

const Products: Model<ProductModel> = model('product', ProductSchema);
export { Products, ProductModel, ProductSchema };

// productSchema.statics.build = (data: ProductModel) => {
//     return new Product(data);
// }