import { NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <img src={logo} alt="logo" />
      <h2>DNB Hub</h2>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <section>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Login</NavLink>
        </section>
      )}
    </nav>
  );
};

export default Navbar;
