import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { delay, motion } from 'framer-motion';
import { AppContext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const {user,setShowLogin}=useContext(AppContext)
  const navigate=useNavigate()
  
  const onClickHandler=()=>{
    if(user){
      navigate('/result')

    }else{
      setShowLogin(true)
    }
  }


  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Title Badge */}
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white 
          px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p>Best Text to Image Generator</p>
        <img src={assets.star_icon} alt="Star icon" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl
          sm:max-w-[590px] mx-auto mt-10 text-center"
      >
        Turn text to <span className="text-blue-600"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 2 }}
          animate={{ opacity: 1}}
        
        >image</span>, in seconds.
      </motion.h1>

      {/* Subtitle */}
      <motion.p className="text-center max-w-xl mx-auto mt-5"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        animate={{ opacity: 1, y: 0 }}
      
      >
        Transform your words into captivating visuals with this advanced
        text-to-image generator, combining creativity and AI to bring your
        ideas to life.
      </motion.p>

      {/* Generate Images Button */}
      <motion.button onClick={onClickHandler}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2
          flex items-center gap-2 rounded-full hover:bg-gray-800 transition-all duration-300"

          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{default:{duration:0.5},opacity:{delay:0.8},duration:1}}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="Star group icon" />
      </motion.button>

      {/* Generated Image Samples */}
      <motion.div 
      
      initial={{ opacity: 0}}
        transition={{ delay: 1, duration: 1 }}
        animate={{ opacity: 1}}

      className="flex flex-wrap justify-center mt-16 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.img
          whileHover={{scale:1.05,duration:0.1}}
            className="rounded hover:scale-105 transition-all duration-300
              cursor-pointer max-sm:w-10"
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt={`Generated sample ${index + 1}`}
            key={index}
            width={70}
          />
        ))}
      </motion.div>

      <motion.p 
       initial={{ opacity: 0}}
       transition={{ delay: 1.2, duration: 0.8 }}
       animate={{ opacity: 1}}
      
      className="mt-2 text-neutral-600">Images Generated from Imagify</motion.p>

    </motion.div>
  );
};

export default Header;