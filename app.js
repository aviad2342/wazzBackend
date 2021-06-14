const path = require("path");
const express = require('express');
const cors = require('cors');
const http = require("http").createServer(express);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const app = express();
const port = 8000;
//mongodb+srv://aviad:<password>@wazzup.xq4vf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://aviad:aviad2342@wazzup.xq4vf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to database!');
}).catch(() => {
  console.log('Connected failed!');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/userImages", express.static(path.join("wazzBackend/userImages")));
app.use("/chatImages", express.static(path.join("wazzBackend/chatImages")));

io.on("connection", (socket) => {
  socket.on("join", (chatId) =>{});
  socket.on("message", (message) =>{});
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`)
});
