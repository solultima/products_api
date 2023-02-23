import bodyParser from 'body-parser';
import express from 'express';
import { getListHandler, createProduct, getProductByIDHandler, updateStockHandler, updatePriceHandler, deleteProductHandler } from './products';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.get('/products', getListHandler);
app.get('/products/:id', getProductByIDHandler);
app.post('/products', createProduct);
app.put('/products/:id/stock', updateStockHandler);
app.put('/products/:id/price', updatePriceHandler);
app.delete('/products/:id',deleteProductHandler)
app.use('/**', (req, res) => {
    res.status(404).send({ error: 'resource not found' });
})

app.listen(PORT, () => {
    console.log(`Products APIs are running on port ${PORT}`);
});

