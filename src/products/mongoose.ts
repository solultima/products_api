import mongoose from 'mongoose';
import { inspect } from 'util';

const url = 'mongodb://products_api_data:27017';

mongoose.set("strictQuery", true);

export const getConnection = async () => {
    return await mongoose.connect(url, { 
        appName: 'Products API',
        dbName: 'products_api_data'
     }).then((connection) => {
        console.log(`Connected to Database ...${inspect(connection, false, 1, true)}`);
        return connection;
     });
}

// export const getProductsUsingMongoose = async () => {
//     const connection = await mongoose.connect('mongodb://products_api_data:27017', {
//         dbName: 'products_api_data'
//     });
//     connection.Query()
//     Product.find();
// }