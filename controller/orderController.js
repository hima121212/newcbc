import Order from "../models/order.js"; // Order මොඩල් එක
import Product from "../models/product.js"; // Product මොඩල් එක
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    if (!isCustomer) { // customer ද කියලා බලනවා
        res.json({
            message: "please login as customer to create order"
        });
        return;
    }

    try {
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1); // ලේටස්ට් order එක
        let orderId;

        if (latestOrder.length === 0) {
            orderId = "CBC0001"; // පළවෙනි ID
        } else {
            const currentOrderId = latestOrder[0].orderId; // ලේටස්ට් ID
            const numberString = currentOrderId.replace("CBC", ""); // CBC ඉවත් කරනවා
            const number = parseInt(numberString); // අංකයක් කරනවා
            const newNumber = (number + 1).toString().padStart(4, "0"); // එකක් වැඩි කරනවා
            orderId = "CBC" + newNumber; // නව ID එක
        }

        const newOrderData = req.body; // order data ගන්නවා

        const newPrdoctArray = [];

        for (let i = 0; i < newOrderData.ordereditems.length; i++) {
            const product = await Product.findOne({
                productId: newOrderData.ordereditems[i].productId
            }); // product එක හොයනවා

            if (product == null) { // product නැත්තම්
                res.json({
                    message: "product with id  " + newOrderData.ordereditems[i].productId + " not found"
                });
                return;
            }

            newPrdoctArray[i] = {
                name: product.productName,
                price: product.price,
                quantity: newOrderData.ordereditems[i].quantity,
                image: product.images[0]
            }; // product array එකට එකතු කරනවා

            console.log(newPrdoctArray); // print කරනවා

            newOrderData.ordereditems = newPrdoctArray; // order data එකට දානවා

        }

        newOrderData.orderId = orderId; // orderId එක දානවා
        newOrderData.email = req.user.email; // email එක දානවා

        const order = new Order(newOrderData); // නව order එක
        await order.save(); // save කරනවා

        return res.status(201).json({ message: "Order Created", order }); // response එක

    } catch (err) {
        console.log(err); // error print
        return res.status(500).json({ message: "Error creating order" }); // error msg
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find(); // orders ගන්නවා
        return res.status(200).json(orders); // response එක යවනවා
    } catch (err) {
        console.log(err); // error print
        return res.status(500).json({ message: "Error getting orders" }); // error msg
    }
}
