import { useContext } from "react";
import SearchBar from "../../components/searchBar/searchBar";
import "./homepage.scss";
import { AuthContext } from "../../Context/AuthContext";

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Reale & Get Your Dream Place Find</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
            molestiae doloremque, quod ullam eos repellat. Architecto
            necessitatibus doloremque sequi non vero in, itaque maxime sit
            maiores facere, ea perferendis. Ducimus.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
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

export default Homepage;
