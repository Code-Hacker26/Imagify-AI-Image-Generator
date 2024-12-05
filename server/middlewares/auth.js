import jwt from 'jsonwebtoken';

// Middleware: userAuth
const userAuth = async (req, res, next) => {
  try {
    // Extract token from headers
    const {token} = req.headers; // Assumes 'Bearer <token>' format

    // If no token is provided, respond with an error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please log in again',
      });
    }

    // Verify token and extract user ID
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your .env file

    // Check if the token contains a user ID
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id; // Attach user ID to request body
       // Proceed to the controller
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please log in again',
      });
    }

    next();
  } catch (error) {
    // Handle errors in token verification
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;
