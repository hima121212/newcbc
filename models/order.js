import mongoose from "mongoose";    

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
    },

    ordereditems: [
        {


            name: {
                type: String,
                required: true,

            },

            price: {
                type: Number,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },

            image: {
                type: String,
                required: true,
            },



        }
    ],

    date: {
        type: Date,
        default: Date.now,
    },

    paymentId: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "preparing",
    },

    notes: {
        type: String,
       
    },

    name: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    }


})


const Order = mongoose.model("Orders", orderSchema); // mongoose.model එකක් හදනවා.
export default Order;