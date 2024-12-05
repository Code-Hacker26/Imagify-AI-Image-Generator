// Import Mongoose
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
});

// Create the User model (with model reuse logic)
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

// Export the User model
export default userModel;
