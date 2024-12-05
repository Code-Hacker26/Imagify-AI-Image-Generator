import express from 'express'; // Importing Express
import { registerUser, loginUser,userCredits,paymentRazorpay,verifyRazorpay } from '../controllers/userController.js'; // Importing controller functions

import userAuth from '../middlewares/auth.js'

// Creating the router
const userRouter = express.Router();

// Define the endpoints
// Route for user registration
userRouter.post('/register', registerUser);

// Route for user login
userRouter.post('/login', loginUser);

userRouter.get('/credits',userAuth, userCredits);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);

userRouter.post('/verify-razor', verifyRazorpay);
// Export the router
export default userRouter;



// http://localhost:4000/api.user/register
// hhtp://localhost:4000/api/user/login

