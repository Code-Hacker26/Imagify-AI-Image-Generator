// Import Mongoose package
import mongoose from 'mongoose';

// Create the async function to connect the database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection URI from the environment variable
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
      });
      
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
    // Listen for the connected event
    

   
  } catch (error) {
    // Log any errors during the connection
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connectDB function
export default connectDB;
