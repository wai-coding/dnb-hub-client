import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

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
      const { data } = await axios.post("http://localhost:5005/auth/login", {
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
    <div>
      <h3>Login!</h3>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button>Login</button>
        <p>New Here? </p>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};
export default Login;
