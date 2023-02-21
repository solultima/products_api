import express from 'express';
import { Request, Response } from 'express';
import {  getProductByID } from './products';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/products/:id', getProductByID);

app.use('/**', (req, res) => {
    res.status(404).send({error: 'resource not found'});
})

app.listen(PORT, () => {
    console.log(`Products APIs are running on port ${PORT}`);
});