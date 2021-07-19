const express = require("express");
const router = express.Router();
const { userRegistration, userExistance, userLogin } = require("../controllers/users-controllers");

//post routes for user
router.post("/register", userRegistration);
router.post("/existance", userExistance);
router.post("/login", userLogin);

module.exports = router;
