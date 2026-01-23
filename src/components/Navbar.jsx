import { NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt="logo" />
      <h2>DNB Hub</h2>
      <section>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
      </section>
    </nav>
  );
};
export default Navbar;
