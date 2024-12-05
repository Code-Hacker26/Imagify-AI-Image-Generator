import React from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from 'framer-motion';

const Description = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28 '>
      <h1  className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your Imagination into Images !! </p>


        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img src={assets.sample_img_1} alt='' className='w-80 xl:w-96 rounded-lg'/>
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4 '>
                    Introducing the AI-Powered Text to Image Generator 
                </h2>
                <p className='text-gray-600 mb-4'>Transforming your ideas into stunning visuals has never been easier. Follow these simple steps to use the AI-Powered Text-to-Image Generator:</p>

                <p className='text-gray-600  mb-4'> Step 1: Access the Generator
                    Visit the AI-Powered Text-to-Image Generator platform.
                    Ensure you're logged in, or create an account for a personalized experience.
                </p>

                <p className='text-gray-600  mb-4'>
                Step 2: Enter Your Text
                    In the input box provided, type a short description of the image you want to create.
                    Examples:
                    "A serene sunset over a mountain lake."
                    "A futuristic cityscape with flying cars."
                </p>

                <p className='text-gray-600  mb-4'>
                Step 3: Generate the Image
                    Click the "Generate Image" button to create your visual masterpiece.
                    Wait a few seconds while the AI processes your input.
                </p>
            </div>
        </div>

    </motion.div>
  )
}

export default Description
