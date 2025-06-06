import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import styles from "./SideDrawer.module.scss";

const SideDrawer = (props: {
  show: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const { show, children, onClick } = props;

  const content = (
    <motion.aside
      initial={{ x: 0 }}
      animate={{ x: show ? "50vw" : "100vw" }}
      transition={{ duration: 1 }}
      className={styles["side-drawer"]}
      onClick={onClick}
    >
      {children}
    </motion.aside>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer")!);
};

export default SideDrawer;
