import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../config/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        password,
        email,
      });
      console.log(data);
      localStorage.setItem("authToken", data.authToken);
      await authenticateUser();
      nav("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div className="auth-card">
      <h3>Login!</h3>
      <form onSubmit={handleLogin} className="form">
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
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button className="btn-primary">Login</button>
        </div>
        <div className="form-footer">
          <p>New Here?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
