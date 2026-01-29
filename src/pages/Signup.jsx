import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, {
        username,
        password,
        email,
      });
      console.log(data);
      nav("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div className="auth-card">
      <h3>Sign up with us!</h3>
      <form onSubmit={handleSignup} className="form">
        <div className="form-row">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="Choose a username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button className="btn-primary">Sign Up</button>
        </div>
        <div className="form-footer">
          <p>Already a member?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;
