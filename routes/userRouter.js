

import express from "express"; // Import express from "express" module.
import { createUser, loginUser , getuser} from "../controller/userController.js"; // Import createUser function from userController.js.

const userRouter = express.Router(); // Create a new router object using express.Router().

userRouter.post("/", createUser); // Define a POST request route to create a new user.

userRouter.post("/login", loginUser); // Define a POST request route to log in a user.

userRouter.get("/", getuser); // Define a GET request route to get user information.












export default userRouter; // Export the userRouter object.