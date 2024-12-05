# Imagify - The AI Image Generator

**Imagify** is an AI-powered image generator application that leverages advanced AI tools and services to create stunning visuals from user prompts. This project integrates MongoDB Atlas for database management, Razorpay for payment testing, JWT for user authentication and protection, and Clipdrop AI for prompt-based image generation.

---

## 🚀 Features
- **AI Image Generation**: Generate custom images based on user prompts using Clipdrop AI.
- **User Authentication**: Secured login and signup functionality with JWT.
- **Credit-Based System**: Users can purchase credits via Razorpay to generate images.
- **MongoDB Atlas Integration**: Scalable and secure database for storing user and transaction data.
- **Responsive UI**: Intuitive and user-friendly interface for seamless interaction.

---

## 🛠️ Technologies Used

### Frontend
- **React.js**: A component-based library for building the user interface.
- **Axios**: For API communication.
- **Toast Notifications**: For user feedback.

### Backend
- **Node.js & Express.js**: Server-side development.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **Razorpay**: Integrated for payment testing.
- **JWT (JSON Web Tokens)**: For secure authentication.

---

## 📦 Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account.
- Razorpay test account.
- Clipdrop API key.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Code-Hacker26/Imagify-AI-Image-Generator.git
   cd Imagify-AI-Image-Generator

2. Install dependencies:
   ```bash
   npm install
3. Configure .env file:
 
   Upload the necessary API key and id
4. Start the backend Server:
  ```bash
    npm run server
5. Start the frontend server:
  ```bash
  npm run dev

** 💳 Payment Testing with Razorpay **
The project integrates Razorpay for handling credit purchases. Use Razorpay's test credentials to simulate transactions. After a successful payment, credits are added to the user's account.

** 🔐 Security **
User passwords are securely hashed.
JWT is used to protect routes and ensure secure user sessions.

.
** 📂 Project Structure **
Imagify-AI-Image-Generator/
├── client/           # React frontend
├── server/           # Express backend
├── routes/           # API routes
├── controllers/      # Business logic for API
├── models/           # MongoDB schemas
├── public/           # Static assets
├── .env              # Environment variables
└── README.md         # Project documentation

** 📖 Future Scope **
# Video Generation: Extend support for video generation using AI tools.
# Enhanced Authentication: Multi-factor authentication for better security.
# Subscription Plans: Add premium features for subscribers.
# Community Platform: Allow users to share and vote on generated images.


