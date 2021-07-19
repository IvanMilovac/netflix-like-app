import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import "./SignInScreen.css";

function SignInScreen() {
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signInHandler = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: "http://" + process.env.IP_NODE_SERVER + ":5000/api/users/",
      timeout: 1000,
    });
    const userLogin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const result = await instance.post("/login", userLogin);
      setError("");
      const request = {
        name: result.data.username,
        token: result.data.tokenObj.token,
        expiration: new Date(new Date().getTime() + 1000 * 300),
      };
      login(request);
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.msg);
      }
    }
  };
  return (
    <div className="signInScreen">
      <form onSubmit={signInHandler}>
        <h1>Sign In</h1>
        {error !== "" && (
          <h1 className="errorMessage" style={{ color: "red" }}>
            {error}
          </h1>
        )}
        <input ref={emailRef} placeholder="Email" type="Email" />
        <input ref={passwordRef} placeholder="Password" type="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInScreen;
