import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back </h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">Don´t you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img
          src="/bg.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
