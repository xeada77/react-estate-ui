import { useContext, useState } from "react";
import "./card.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const Card = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(item.isSaved);
  const navigate = useNavigate();
  //console.log(item.isSaved);

  const handleSave = async () => {
    setSaved((prev) => !prev);

    if (!currentUser) {
      navigate("/login");
    }
    try {
      //console.log(item.id);
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  return (
    <div className="card">
      <Link
        to={`/${item.id}`}
        className="imageContainer"
      >
        {item.images !== undefined ? (
          <img
            src={item.images[0]}
            alt=""
          />
        ) : (
          <img
            src=""
            alt=""
          />
        )}
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img
            src="/pin.png"
            alt=""
          />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img
                src="/bed.png"
                alt=""
              />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img
                src="/bath.png"
                alt=""
              />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          {currentUser === null || currentUser.id !== item.userId ? (
            <div className="icons">
              <div
                className="icon"
                style={saved ? { backgroundColor: "#fece51" } : null}
                onClick={handleSave}
              >
                <img
                  src="/save.png"
                  alt=""
                />
              </div>
              <div className="icon">
                <img
                  src="/chat.png"
                  alt=""
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
