const express = require("express");

const AuthController = require("../controllers/auth");

const extractUserImage = require('../middleware/image');

const router = express.Router();


router.post("/login", AuthController.userLogin);


module.exports = router;