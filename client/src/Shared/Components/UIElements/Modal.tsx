import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import "./Modal.css";
import BackDrop from "./BackDrop";

interface ModalOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  onSubmit?: () => void;
  children: ReactNode;
  headerClass?: string;
  header: string;
  contentClass?: string;
  footerClass?: string;
  footer: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  className,
  style,
  onSubmit,
  children,
  headerClass,
  header,
  contentClass,
  footerClass,
  footer,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal")!);
};

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { show, onCancel } = props;
  return (
    <Fragment>
      {show && <BackDrop onClick={onCancel} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className='modal'
      >
        <ModalOverlay
          {...props}
          header='Modal Header'
          footer={<div>Modal Footer</div>}
        />
      </motion.div>
    </Fragment>
  );
};

export default Modal;
