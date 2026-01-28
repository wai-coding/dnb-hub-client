import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="DNB Hub logo" className="navbar-logo" />
        </Link>
        <h2 className="navbar-title">DNB Hub</h2>
      </div>
      <section className="navbar-links">
        <NavLink to="/events" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Events</NavLink>
        <NavLink to="/artists" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Artists</NavLink>
        <NavLink to="/promoters" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Promoters</NavLink>
        {isLoggedIn && <NavLink to="/profile" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Profile</NavLink>}
      </section>
      {isLoggedIn ? (
        <section className="navbar-auth">
          <button onClick={handleLogout}>Logout</button>
        </section>
      ) : (
        <section className="navbar-auth">
          <NavLink to="/login" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Login</NavLink>
          <NavLink to="/signup" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Sign Up</NavLink>
        </section>
      )}
    </nav>
  );
};

export default Navbar;
