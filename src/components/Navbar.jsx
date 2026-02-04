import { NavLink, Link } from "react-router-dom";
import favicon from "../assets/favicon.png";
import defaultAvatar from "../assets/avatar.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn, currentUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <img src={favicon} alt="DNB Hub logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="navbar-title-link">
          <h2 className="navbar-title">DNB Hub</h2>
        </Link>
      </div>
      <section className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/artists"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Artists
        </NavLink>
        <NavLink
          to="/promoters"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Promoters
        </NavLink>
      </section>
      {isLoggedIn ? (
        <section className="navbar-auth">
          <Link to="/profile" className="navbar-avatar-link">
            <img
              src={currentUser?.profilePicture || defaultAvatar}
              alt="Profile"
              className="navbar-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </section>
      ) : (
        <section className="navbar-auth">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Sign Up
          </NavLink>
        </section>
      )}
    </nav>
  );
};

export default Navbar;
