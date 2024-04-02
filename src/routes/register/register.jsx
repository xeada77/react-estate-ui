import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="formContainer">
        <form>
          <h1>Create an Account</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
          />
          <button>Register</button>
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
