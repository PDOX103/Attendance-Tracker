import React from 'react';
import Navbar from '../Components/Navbar';
import '../Pages/HomPage.css'; 
import {motion} from "framer-motion"
import { FadeLeft } from '../Utility/Animation';

const HomePage = () => {
  return (
    <>
     <Navbar />
      <div className="background-image">
        <img src="/images/Background1.png" alt="Background" />
      </div>
     


     <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[650px]">
            {/*Hero images*/}

            <div className="flex justify-center items-center absolute left-16">
                <motion.img src="/images/teaching 1.png" 
                initial={{opacity:0, x:-200, rotate: 0}}
                animate={{opacity:1, x:0, rotate:0}}
                transition={{duration:1, delay:0.2}}
                />
            </div>
        
            {/*Front Info*/}
            <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
                <div className="text-center absolute right-40 top-28">
                    <motion.h1
                    variants={FadeLeft(0.6)}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl font-roboto font-semibold">Hey! Welcome</motion.h1>
                    <br/>
                    <motion.h1 
                    variants={FadeLeft(0.9)}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-roboto">Track attendance for all</motion.h1>
                    <br/>
                    <motion.h1 
                    variants={FadeLeft(1.2)}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-roboto">your classes with ease</motion.h1>

                    {/*Get started Button*/}
                    <motion.div 
                    variants={FadeLeft(1.5)}
                    initial="hidden"
                    animate="visible" >
                        
                        <button className="hover:!scale-110 duration-300">
                        <img src="/images/Get_Started_Button.png" />
                        </button>

                        {/* <button className="primary-btn">Get started</button> */}
                    </motion.div>
                </div>
            </div>
            

        </div>
     </section>
    </>
  );
};

export default HomePage;
