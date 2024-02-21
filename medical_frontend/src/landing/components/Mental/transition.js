import { motion } from "framer-motion";
import React from "react";

const transition = (OgComponent) => {
  return function TransitionComponent(props) {
    return (
      <>
        <OgComponent {...props} />
        <motion.div
          className="slide-in"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="slide-out" 
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
      </>
    );
  };
};

export default transition;