import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../Context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/uploadWidget/uploadWidget.jsx";

const ProfileUpdatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      //console.log(res.data);
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(avatar);
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
          src={avatar[0] || currentUser.avatar || "/noavatar.png"}
          alt=""
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dwsetf6sr",
            uploadPreset: "estateapp",
            // cropping: true, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            // sources: [ "local", "url"], // restrict the upload sources to URL and local files
            multiple: false, //restrict upload to a single file
            folder: "avatar", //upload files to the specified folder
            // tags: ["users", "profile"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "wep"], //restrict uploading to image files only
            maxImageFileSize: 2000000, //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
