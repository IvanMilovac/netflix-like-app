import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Nav.css";
import netflixLogo from "../images/netflixLogo.png";
import netflixAvatar from "../images/netflixAvatar.png";

function Nav() {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const scrollHandler = () => {
    if (window.scrollY > 30) setShow(true);
    else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__content">
        <img src={netflixLogo} alt="" className="nav__logo" onClick={() => history.push("/")}/>
        <img
          src={netflixAvatar}
          alt=""
          className="nav__avatar"
          onClick={() => history.push("/profile")}
        />
      </div>
    </div>
  );
}

export default Nav;
