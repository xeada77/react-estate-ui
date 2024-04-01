import Chat from "../../components/chat/chat";
import List from "../../components/list/list";
import { userData } from "../../lib/dummydata";
import "./profilePage.scss";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={userData.img}
                alt=""
              />
            </span>
            <span>
              Username: <b>{userData.name}</b>
            </span>
            <span>
              E-mail: <b>{userData.email}</b>
            </span>
          </div>

          <div className="title">
            <h1>My List</h1>
            <button>Add New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
