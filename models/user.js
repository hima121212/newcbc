import mongoose from "mongoose";    

    


const userschema = mongoose.Schema({ // mongoose.Schema එකක් හදනවා.
    


    email: { // mongoose.Schema
        type: String, // email එක string විදියට ගන්නවා.
        required: true, // email එක අනිවාර්යයි.
        unique: true
    },
    firstname: { // mongoose.Schema
        type: String, // firstname එක string විදියට ගන්නවා.
        required: true // firstname එක අනිවාර්යයි.
    },
    lastname: { // mongoose.Schema
        type: String, // lastname එක string විදියට ගන්නවා.
        required: true // lastname එක අනිවාර්යයි.
    },
    password: { // mongoose.Schema
        type: String, // password එක string විදියට ගන්නවා.
        required: true // password එක අනිවාර්යයි.
    },
    isBlocked: { // mongoose.Schema
        type: Boolean, // isBlocked එක boolean විදියට ගන්නවා.
        default: false // isBlocked එක default විදිහට false.
    },

    type: { // mongoose.Schema
        type: String, // type එක string විදියට ගන්නවා.
        default: "customer"
    },

    profilepicture: { // mongoose.
        type: String, // profilepicture එක string විදියට ගන්නවා.
        default: "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=" // profilepicture එක default විදිහට link එකක්.
    }


});

const User = mongoose.model("users", userschema); // mongoose.model එකක් හදනවා.
export default User; // User model එක export කරනවා.