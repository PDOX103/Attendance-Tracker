import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const ResponsiveMenu = ({open}) => {
  return (
    <AnimatePresence mode="wait">
    {
        open && (
            <motion.div
            initial = {{opacity:0, y: -100}}
            animate = {{opacity:1, y:0}}
            exit={{opacity:0, y:-100}}
            transition={{duration: 0.3}} 
            className="absolute top-20 left-0 w-full h-screen z-2`">
                <div className="font-roboto uppercase bg-BLUE py-10 m-6 rounded-3xl">
                    <ul className="flex flex-col items-center gap-10"> 
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Pricing</li>
                        <li>FAQ</li>
                    </ul>
                </div>
            </motion.div>
        )
    }
    </AnimatePresence>
  )
}

export default ResponsiveMenu
