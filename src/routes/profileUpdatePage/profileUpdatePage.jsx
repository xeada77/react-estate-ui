import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const ProfileUpdatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = () => {};

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              defaultValue={currentUser.username}
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="item">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              defaultValue={currentUser.email}
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              minLength={3}
              maxLength={20}
            />
          </div>

          <button disabled={isLoading}>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          className="avatar"
          src={currentUser.avatar || "/noavatar.png"}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
