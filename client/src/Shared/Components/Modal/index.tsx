import { motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0, scaleX: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleX: [0.03, 1],
    scaleY: [0.005, 0.005, 0.005, 1],
  },
  exit: {
    scaleX: [1, 1, 1, 0.03, 0],
    scaleY: [1, 0.005, 0.005, 0.005],
    transition: { delay: 0.5 },
  },
};

const modalVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 1 } },
  exit: { y: -100, opacity: 0 },
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return createPortal(
    <>
      <motion.div
        onClick={onClose}
        variants={backdropVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='backdrop'
      ></motion.div>
      <motion.dialog
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        open
        className='modal'
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
};
export default Modal;
