import "./singlePage.scss";
import Slider from "../../components/slider/slider";
import Map from "../../components/map/map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const SinglePage = () => {
  const { data } = useLoaderData();
  const [saved, setSaved] = useState(data.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  //console.log(data);

  const handleSave = async () => {
    setSaved((prev) => !prev);

    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("/users/save", { postId: data.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={data.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{data.title}</h1>
                <div className="address">
                  <img
                    src="/pin.png"
                    alt=""
                  />
                  <span>{data.address}</span>
                </div>
                <div className="price">$ {data.price}</div>
              </div>
              <div className="user">
                <img
                  src={data.user.avatar}
                  alt=""
                />
                <span className="username">{data.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img
                src="/utility.png"
                alt=""
              />
              <div className="featureText">
                <span>Utilities</span>
                {data.postDetail.utilities === "renter" ? (
                  <p>Renter is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img
                src="/pet.png"
                alt=""
              />
              <div className="featureText">
                <span>Pet Policy</span>
                {data.postDetail.pet === "allow" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img
                src="/fee.png"
                alt=""
              />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img
                src="/size.png"
                alt=""
              />
              <span>{`${data.postDetail.size} m2`}</span>
            </div>
            <div className="size">
              <img
                src="/bed.png"
                alt=""
              />
              <span>{`${data.bedroom} ${
                data.bedroom > 1 ? "beds" : "bed"
              }`}</span>
            </div>
            <div className="size">
              <img
                src="/bath.png"
                alt=""
              />
              <span>{`${data.bathroom} ${
                data.bathroom > 1 ? "bathrooms" : "bathroom"
              }`}</span>
            </div>
          </div>
          <p className="title">Nearby PLaces</p>
          <div className="listHorizontal">
            <div className="feature">
              <img
                src="/school.png"
                alt=""
              />
              <div className="featureText">
                <span>School</span>
                <p>{`${data.postDetail.school}m away`}</p>
              </div>
            </div>
            <div className="feature">
              <img
                src="/bus.png"
                alt=""
              />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{`${data.postDetail.bus}m away`}</p>
              </div>
            </div>
            <div className="feature">
              <img
                src="/restaurant.png"
                alt=""
              />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{`${data.postDetail.restaurant}m away`}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[data]} />
          </div>
          {currentUser === null || currentUser.id !== data.userId ? (
            <div className="buttons">
              <button>
                <img
                  src="/chat.png"
                  alt=""
                />
                Send a Message
              </button>
              <button
                className={saved ? "saved" : ""}
                onClick={handleSave}
              >
                <img
                  src="/save.png"
                  alt=""
                />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
