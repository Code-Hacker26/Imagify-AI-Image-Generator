import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets"; // Assuming correct path to assets
import { AppContext } from "../context/Appcontext";
import {motion} from 'framer-motion'
import { toast } from 'react-toastify';

import axios from 'axios'


const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin,backendUrl,setToken,setUser} = useContext(AppContext); // Correct destructuring

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  

  const onSubmitHandler=async(e) => {
      e.preventDefault();

      try{
        if(state=='Login'){
          const {data}=await axios.post(backendUrl+'api/user/login',{email,password})

          if(data.success){
            setToken(data.token)   
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          
          }else{
            toast.error(data.message)
          }

        }else{
          const {data}=await axios.post(backendUrl+'api/user/register',{name, email,password})

          if(data.success){
            setToken(data.token)   
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          
          }else{
            toast.error(error.message)
          }
          
        }
      }catch(error){
        toast.error(error.message)
      }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset"; // Fixed typo
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm 
    bg-black/30 flex justify-center items-center"
    >
      <motion.form 
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      
      className="relative bg-white p-10 rounded-xl text-slate-500">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          {/* Title */}
          <h1 className="text-center text-2xl text-neutral-700 font-medium mb-4">
            {state}
          </h1>

          {/* Subtitle */}
          <p className="text-sm">
            Welcome {state === "Login" ? "back! Please sign in to continue." : "to our platform! Please create an account."}
          </p>

          {state !== "Login" && (
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
              {/* Icon */}
              <img
                src={assets.star_icon} // Replace 'star_icon' with the correct key
                alt="User Icon"
                className="h-5 w-5 mr-2"
              />
              {/* Input */}
              <input
                type="text"
                onChange={e=> setName(e.target.value)}
                value={name}
                placeholder="Full Name"
                required
                className="flex-1 outline-none bg-transparent text-sm"
              />
            </div>
          )}

          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            {/* Icon */}
            <img
              src={assets.email_icon} // Replace with the correct key
              alt="Email Icon"
              className="h-5 w-5 mr-2"
            />
            {/* Input */}
            <input
              type="email"
              onChange={e=> setEmail(e.target.value)}
                value={email}
              placeholder="Email"
              required
              className="flex-1 outline-none bg-transparent text-sm"
            />
          </div>

          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            {/* Icon */}
            <img
              src={assets.lock_icon} // Replace with the correct key
              alt="Password Icon"
              className="h-5 w-5 mr-2"
            />
            {/* Input */}
            <input
              type="password"
              onChange={e=> setPassword(e.target.value)}
                value={password}
              placeholder="Password"
              required
              className="flex-1 outline-none bg-transparent text-sm"
            />
          </div>

          <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password?</p>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            {state === "Login" ? "Login" : "Create Account"}
          </button>
        </div>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon} // Replace with the correct key
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
