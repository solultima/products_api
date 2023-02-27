import bodyParser from 'body-parser';
import express from 'express';
import { getListHandler, createProduct, getProductByIDHandler, updateStockHandler, updatePriceHandler, deleteProductHandler, updateStockValidator } from './products';

const app = express();
const PORT = process.env.PORT || 5000;
const validator = () => [updateStockValidator, updateStockValidator];
app.use(bodyParser.json());

app.route('/products')
    .get(getListHandler)
    .post(createProduct)
app.route('/products/:id')
    .get(getProductByIDHandler)
    .delete(deleteProductHandler)

app.put('/products/:id/stock', validator(), updateStockHandler);
app.put('/products/:id/price', updatePriceHandler);

app.use('/**', (req, res) => {
    res.status(404).send({ error: 'resource not found' });
})

app.listen(PORT, () => {
    console.log(`Products APIs are running on port ${PORT}`);
});

