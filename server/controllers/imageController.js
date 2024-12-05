import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModels.js";

export const generateImage = async (req, res) => {
  try {
    
    const { userId,prompt } = req.body;

    // Fetch user from database
    const user = await userModel.findById(userId);

    // Validate inputs
    if (!user) {
        console.log(userId)
        console.log(user)
      return res.status(400).json({ success: false, message: "Missing details 123" });
    }


    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // console.log("API Response Data:", data);

    // Create form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Make API call to generate image
    const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        "x-api-key": process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer",
    });

    // Convert response to Base64 image URL
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id,{
        creditBalance :user.creditBalance -1 
    }) 

    // Send response
    return res.json({
      success: true,
      message: "Image generated",
      creditBalance: user.creditBalance-1,
      resultImage,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
