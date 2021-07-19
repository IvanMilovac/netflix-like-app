const { useState, useEffect, useCallback } = require("react");

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = useCallback(({ name, token, expiration }) => {
    setToken(token);
    setName(name);
    const expiresIn = expiration || new Date(new Date().getTime() + 1000 * 300);
    setTokenExpiration(expiresIn);
    const user = {
      name,
      token,
      expiration: expiresIn.toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setName("");
    setTokenExpiration(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date().getTime()
    ) {
      login({ ...userData, expiration: new Date(userData.expiration) });
    }
  }, [login]);

  return { token, name, login, logout };
};

export default useAuth;
