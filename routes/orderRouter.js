import express from 'express';
import { createOrder, getOrders } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/", getOrders); // Define a GET request route to get all orders.

// orderRouter.post("/order/:id", createOrder); // Define a POST request route to create a new order for a specific product.


/*
using postman

const createOrder = (req, res) => {
    const orderId = req.params.id; // :id වලින් එන value එක ගන්නවා
    res.send(`Order created with ID: ${orderId}`);
  };

*/


export default orderRouter;