import { useState } from "react";
import "./navbar.scss";
import { userData } from "../../lib/dummydata";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <a
          href="/"
          className="logo"
        >
          <img
            src="/logo.png"
            alt=""
          />
          <span>LamaEstate</span>
        </a>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Agents</a>
      </div>
      <div className="right">
        {userData ? (
          <div className="user">
            <img
              src={userData.img}
              alt=""
            />
            <span>John Doe</span>
            <Link
              to="/profile"
              className="profile"
            >
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="">Sign in</a>
            <a
              href=""
              className="register"
            >
              Sign up
            </a>{" "}
          </>
        )}
        <div className="menuIcon">
          <img
            src="menu.png"
            alt=""
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          {userData ? (
            <div className="user">
              <img
                src={userData.img}
                alt=""
              />
              <span>John Doe</span>
            </div>
          ) : null}
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Agents</a>
          <a href="">Sign in</a>
          <a href="">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
