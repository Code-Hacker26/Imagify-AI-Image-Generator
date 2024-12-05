import userModel from '../models/userModels.js'; // Importing the User model
import bcrypt from 'bcrypt'; // For password encryption
import jwt from 'jsonwebtoken'; // For token generation
import dotenv from 'dotenv'; // For accessing environment variables
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js';

dotenv.config(); // Load environment variables from the .env file

// Controller function for user registration
const registerUser = async (req, res) => {
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: 'Missing details: name, email, or password is required.',
      });
    }

    

    // Encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Prepare the user data object
    const userData = {
      name,
      email,
      password: hashedPassword, // Store hashed password
    };

    // Create a new user document
    const newUser = new userModel(userData);

    // Save the user to the database
    const user = await newUser.save();

    // Generate a JWT token using the user's ID
    const token = jwt.sign(
      { id: user._id }, // Payload
      process.env.JWT_SECRET
    );

    // Return success response with token and user information
    res.json({
      success: true,   
      token,
      user: {
        name: user.name, // Only return the name in the response
      },
    });

  } catch (error) {

    console.error('Error during registration 123:', error.message);

    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }else{
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res.json({ success: true, token, user: { name: user.name } });
        }

        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Wrong" });
    }
};

const userCredits = async (req, res) => {
  try {
    // Extract user ID from the request body (added by middleware)
    const { userId } = req.body;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Respond with user's credit balance and name
    res.json({
      success: true,
      credits: user.creditBalance, // Replace `creditBalance` with the actual field name
      user: {
        name: user.name, // Replace `name` with the actual field name
      },  
    });
  } catch (error) {
    // Handle errors
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Validate userId and planId
    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId or planId',
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Define plan details
    let credits, plan, amount;
    switch (planId) {
      case 'Basic':
        credits = 100;
        plan = 'Basic';
        amount = 10;
        break;
      case 'Advanced':
        credits = 500;
        plan = 'Advanced';
        amount = 50;
        break;
      case 'Business':
        credits = 5000;
        plan = 'Business';
        amount = 250;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid plan ID',
        });
    }

    // Prepare transaction data
    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    };

    // Create a new transaction
    const newTransaction = await transactionModel.create(transactionData);

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    // Send successful response
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error in paymentRazorpay:', error.message);

    // Ensure headers are not sent multiple times
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};


const verifyRazorpay = async (req, res) => {
  try {
      const {razorpay_order_id} = req.body;

      // Fetch order details from Razorpay
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

      if (orderInfo.status === "paid") {
          const transactionData = await transactionModel.findById(orderInfo.receipt);

          if (transactionData.payment) {
              return res.json({ success: false, message: "Payment already verified" });
          }

          // Update user's credit balance
          const userData = await userModel.findById(transactionData.userId);

          const creditBalance = userData.creditBalance + transactionData.credits;

          await userModel.findByIdAndUpdate(userData._id, { creditBalance});

          // Update payment status in transaction
          await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

          return res.json({ success: true, message: "Credits added" });
      } else {
          res.json({ success: false, message: "Payment failed" });
      }
  } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
  }
};



export { registerUser, loginUser,userCredits,paymentRazorpay,verifyRazorpay };