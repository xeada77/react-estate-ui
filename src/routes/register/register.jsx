import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post(
        "http://localhost:8800/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      //console.log(res.data);
      navigate("/login");
    } catch (err) {
      //console.log(err.response.data);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            minLength={3}
            maxLength={20}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            minLength={3}
            maxLength={20}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={3}
            maxLength={20}
          />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
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

export default Register;
