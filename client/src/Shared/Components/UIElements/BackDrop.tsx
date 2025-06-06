import ReactDOM from "react-dom";
import "./BackDrop.css";

const BackDrop = ({ onClick }: { onClick: () => void }) => {
  return ReactDOM.createPortal(
    // TODO:Convert To closed tag
    <div onClick={onClick} className='backdrop'></div>,
    document.getElementById("back_drop")!
  );
};

export default BackDrop;
