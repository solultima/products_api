// Import required modules
import { Request,Response } from "express";


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create express app
const app = express();

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());



  interface Product {
    id: string;
    name: string;
    price: number;
  }
  

// Endpoint to update the price of a product
export const updatePrice= (req:Request, res:Response) => {
  // Read the existing data from the products.json file
 const rawData = fs.readFileSync('./database/products.json');
  const products = JSON.parse(rawData);

  // Find the product with the given id
  let productId = req.params.id;
  //let productId = '567d970b-e7c4-478a-8b8d-0b91c50f01c0';
  
  let product = products.find((p: Product) => p.id === productId);  
  // If product is not found, return an error response
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Extract the new price from the request body
  let newPrice = req.body.price;

  // Update the current price of the product with the new price
  product.price = newPrice;

  // Write the updated data back to the products.json file
  fs.writeFileSync('./database/products.json', JSON.stringify(products, null, 2));

  // Return the updated current price of the product
  return res.json({ currentPrice: product.price });
};

// Start the server

