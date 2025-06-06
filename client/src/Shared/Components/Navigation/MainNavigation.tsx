import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackDrop from "../UIElements/BackDrop";
import MainHeader from "./MainHeader";
import "./MainNavigation.scss";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setIsDrawerOpen(false);
      }
    });
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {isDrawerOpen && <BackDrop onClick={closeDrawer} />}
      <SideDrawer show={isDrawerOpen} onClick={closeDrawer}>
        
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
      <button className='main-navigation__menu-btn' onClick={openDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2 className='main-navigation__title'>
          <Link to='/'>
            <span>כ</span>ספי
          </Link>
        </h2>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
