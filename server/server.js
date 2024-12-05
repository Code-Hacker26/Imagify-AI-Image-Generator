// Import Express package
import express from 'express';

// Import CORS package
import cors from 'cors';

// Import dotenv for environment variable configuration
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

// Define the port number
const PORT = process.env.PORT || 4000;

// Create an Express app
const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple GET route
app.get('/', (req, res) => {
  res.send('API working');
});

// Start the Express app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

await connectDB()

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/',(req,res)=>res.send("API WORKING"))

