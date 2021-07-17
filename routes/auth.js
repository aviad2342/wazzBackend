const express = require("express");

const AuthController = require("../controllers/auth");

const extractUserImage = require('../middleware/image');

const router = express.Router();


router.post("/login", AuthController.userLogin);

router.post("/register", AuthController.registerUser);

router.get("/verification/:token", AuthController.verifyUser);


module.exports = router;