const express = require("express");

const ChatController = require("../controllers/chat");

const extractUserImage = require('../middleware/image');

const router = express.Router();

router.post("/new", ChatController.createChat);

router.get("/:id", ChatController.getChat);

router.post("/update/:id", ChatController.updateChat);

// router.post("/add", MessageController.createMessage);

// router.post("/add", MessageController.createMessage);

// router.post("/add", MessageController.createMessage);

// router.post("/login", UserController.userLogin);

// router.get("/login/:email", UserController.getUserAvatar);

// router.get("/login/get/:id", UserController.getUser);

module.exports = router;