import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

const NewPostPage = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const inputs = Object.fromEntries(formData);

    //console.log(inputs);

    try {
      const res = await apiRequest.post("posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          images: images,
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          property: inputs.property,
          type: inputs.type,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
        },
        postDetail: {
          desc: value,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
          income: inputs.income,
          pet: inputs.pet,
          utilities: inputs.utilities,
        },
      });

      //console.log(res.data);
      navigate("/" + res.data.data.id);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                minLength={3}
                maxLength={20}
              />
            </div>
            <div className="item">
              <label htmlFor="Price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                min={1}
                max={2000000}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                minLength={3}
                maxLength={40}
              />
            </div>

            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                onChange={setValue}
              />
            </div>

            <div className="item">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                minLength={3}
                maxLength={40}
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                type="number"
                id="bedroom"
                name="bedroom"
                min={1}
                max={40}
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                type="number"
                id="bathroom"
                name="bathroom"
                min={1}
                max={20}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                minLength={1}
                maxLength={10}
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                min={1}
                max={10}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="property">Property</label>
              <select
                id="property"
                name="property"
              >
                <option value="apartment">Aparment</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                id="utilities"
                name="utilities"
              >
                <option value="Renter is responsible">
                  Renter is responsible
                </option>
                <option value="Owner is responsible">
                  Owner is responsible
                </option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select
                id="pet"
                name="pet"
              >
                <option value="Pets Allowed">Pets Allowed</option>
                <option value="Pets not Allowed">Pets Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                type="text"
                id="income"
                name="income"
                placeholder="Income Policy"
                min={1}
                max={10}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size</label>
              <input
                type="number"
                id="size"
                name="size"
                min={1}
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                type="number"
                id="school"
                name="school"
                min={1}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input
                type="number"
                id="bus"
                name="bus"
                min={1}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                type="number"
                id="restaurant"
                name="restaurant"
                min={1}
              />
            </div>
            <div className="item">
              <button className="submit">Update</button>
            </div>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img
            src={image}
            key={index}
          ></img>
        ))}
        <UploadWidget
          uwConfig={{
            cloudName: "dwsetf6sr",
            uploadPreset: "estateapp",
            // cropping: true, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            // sources: [ "local", "url"], // restrict the upload sources to URL and local files
            multiple: true, //restrict upload to a single file
            folder: "posts", //upload files to the specified folder
            // tags: ["users", "profile"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "wep"], //restrict uploading to image files only
            maxImageFileSize: 2000000, //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
