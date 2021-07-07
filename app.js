const path = require("path");
const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http").createServer(app);
const socket = require('socket.io');
const mongoose = require("mongoose");
const port = 8000;


const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");
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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const server = app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`)
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log('new client connected');
  socket.on("data", id =>{
    const response = 'fuck off' + id;
  socket.emit("client", response);
  });
  socket.on("message", (message) =>{});
});

// module.exports = { io };