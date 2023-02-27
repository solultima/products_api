import { MongoClient } from 'mongodb';

const url = 'mongodb://products_api_data:27017'

export const getClient = async () => {
    return await MongoClient.connect(url, {
        appName: 'Products API'
    });    
}