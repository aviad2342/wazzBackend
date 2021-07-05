const express = require("express");

const MessageController = require("../controllers/message");

const extractUserImage = require('../middleware/image');

const router = express.Router();

router.post("/add", MessageController.createMessage);

// router.post("/add", MessageController.createMessage);

// router.post("/add", MessageController.createMessage);

// router.post("/add", MessageController.createMessage);

// router.post("/login", UserController.userLogin);

// router.get("/login/:email", UserController.getUserAvatar);

// router.get("/login/get/:id", UserController.getUser);

module.exports = router;