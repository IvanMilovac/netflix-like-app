import React, { useContext } from "react";
import Nav from "../components/Nav";
import { UserContext } from "../context/UserContext";

import "./ProfileScreen.css";
import netflixAvatar from "../images/netflixAvatar.png";

function ProfileScreen() {
  const { name, logout } = useContext(UserContext);
  const signOutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img src={netflixAvatar} alt="" />
          <div className="profileScreen__details">
            <h2>{name}</h2>
            <div className="profileScreen__plans">
              <h3>
                Plans <span>(Current Plan: premium)</span>
              </h3>
              <div className="profileScreen__Renew">
                <h4>Renewal date: 04/03/2021</h4>
              </div>
              <div className="profileScreen__plan standard">
                <h4>
                  Netflix Standard<p>1080p</p>
                </h4>
                <button>Subscribe</button>
              </div>
              <div className="profileScreen__plan basic">
                <h4>
                  Netflix Basic<p>480p</p>
                </h4>
                <button>Subscribe</button>
              </div>
              <div className="profileScreen__plan premium">
                <h4>
                  Netflix Premium<p>4K+HDR</p>
                </h4>
                <button>Current Package</button>
              </div>
            </div>
            <button className="profileScreen__signOut" onClick={signOutHandler}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
