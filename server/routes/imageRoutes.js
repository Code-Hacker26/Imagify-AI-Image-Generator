import express from "express";
import { generateImage } from "../controllers/imageController.js";
import userAuth from "../middlewares/auth.js";

const imageRouter = express.Router();

// Define the route with middleware
imageRouter.post("/generate-image", userAuth, generateImage);

// Export the router
export default imageRouter;
