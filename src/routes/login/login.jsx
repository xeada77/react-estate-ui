import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="register">
      <div className="formContainer">
        <form>
          <h1>Log In</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
          />
          <button>Register</button>
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
