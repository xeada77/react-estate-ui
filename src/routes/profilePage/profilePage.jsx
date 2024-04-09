import { Link, useNavigate, Await, defer } from "react-router-dom";
import Chat from "../../components/chat/chat";
import List from "../../components/list/list";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Card from "../../components/card/card";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);

  const userPosts = apiRequest("/posts?userId=" + currentUser.id);
  defer({ userPosts });

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noavatar.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b className="username">{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to={"/add"}>
              <button>Add New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={userPosts}
              errorElement={<p>Error loading posts!</p>}
            >
              {(userPostsResponse) => {
                //console.log(userPostsResponse);
                return userPostsResponse.data.data.map((item) => (
                  <Card
                    key={item.id}
                    item={item}
                  />
                ));
              }}
            </Await>
          </Suspense>

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
