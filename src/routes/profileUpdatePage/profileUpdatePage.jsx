import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../Context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";

const ProfileUpdatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
      });
      console.log(res.data);
      updateUser(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
