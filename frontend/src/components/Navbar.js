import classes from "./Navbar.module.css";

import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <img src={logo} alt="logo" className={classes.logo} />
    </div>
  );
};

export default Navbar;
