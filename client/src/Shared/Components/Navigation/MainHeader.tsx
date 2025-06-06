import { ReactNode } from "react";
import "./MainHeader.css";
const MainHeader = ({ children}:{children:ReactNode}) => {
  return <header className='main-header'>{children}</header>;
};

export default MainHeader;
