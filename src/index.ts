import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import { getList, createProduct, getProductByID,updatePrice } from './products';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.get('/products', getList);
app.get('/products/:id', getProductByID);
app.post('/products', createProduct);
app.put('/products/:id',updatePrice);
app.use('/**', (req:Request, res:Response) => {
    res.status(404).send({error: 'resource not found'});
})

app.listen(PORT, () => {
    console.log(`Products APIs are running on port ${PORT}`);
});