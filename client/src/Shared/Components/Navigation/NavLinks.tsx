// import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
// import { BankidsContext } from "./../../context/BankidsContextProvider";

const NavLinks: React.FC = () => {
  // const { isLoggedIn, logout } = useContext(BankidsContext);
  // let navLinks: JSX.Element;
  const testNavLinks: JSX.Element = (
    <ul className='nav-links'>
      <li>
        <NavLink to='/Kaspi/' className={({ isActive }) => isActive && "active"} exact="true">
          בית
        </NavLink>
      </li>
      <li>
        <NavLink to={`/Kaspi/features`} className={({ isActive }) => isActive && "active"} exact="true">
          פיצ'רים
        </NavLink>
      </li>
      <li>
        <NavLink to='/Kaspi/auth' className={({ isActive }) => isActive && "active"} exact="true">
          התחברות
        </NavLink>
      </li>
    </ul>
  );

  // if (isLoggedIn) {
  //   navLinks = (
  //     <ul className='nav-links'>
  //       <li>
  //         <NavLink to='/'>All Users</NavLink>
  //       </li>
  //       <li>
  //         <NavLink to={`/${props.id}/places`}>My Places</NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/places/new'>Add Places</NavLink>
  //       </li>
  //       <li>
  //         <NavLink onClick={() => logout()} to='/auth'>
  //           Sign-Out
  //         </NavLink>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   navLinks = (
  //     <ul className='nav-links'>
  //       <li>
  //         <NavLink to='/'>All Users</NavLink>
  //       </li>
  //       <li>
  //         <NavLink to={`/${props.id}/places`}>My Places</NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/auth'>Authenticate</NavLink>
  //       </li>
  //     </ul>
  //   );
  // }

  return testNavLinks;
};

export default NavLinks;
