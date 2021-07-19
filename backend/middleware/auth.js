const jwt = require("jsonwebtoken");
const fs = require("fs");

const PUBLIC_KEY = fs.readFileSync(
  "C:\\Users\\Korisnik\\Documents\\React\\REACT Portfolio\\netflix-clone\\backend\\cryptography\\id_rsa_pub.pem"
);

const issueJWT = (user) => {
  try {
    const payload = {
      sub: user._id,
    };

    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
      algorithm: "RS256",
    });
    
    return {
      token: `${token}`,
    };
  } catch (e) {
    return e;
  }
};

const verifyJWT = (token) => {
  try {
    const isValid = jwt.verify(token, PUBLIC_KEY, { algorithm: "RS256" });
    return isValid;
  } catch (e) {
    return e;
  }
};

module.exports.issueJWT = issueJWT;
module.exports.verifyJWT = verifyJWT;
