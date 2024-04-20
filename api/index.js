const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require('http');
const socketio = require('socket.io');

const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/post");
const memeRoute = require("./routes/meme.js");
const friendRoute = require("./routes/friends.js")
const { checkauth } = require("./middlewares/authMid.js");
const User = require("./models/User.js");
const { upload } = require("./services/storage.js");
const { users } = require("./services/socket.js");

const app = express();

// Real Time Services
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (client)=>{
  console.log(client.id)
  client.on('message', (data)=>{
    console.log(data)
    users.set(data, client)
  })
})

// Middlewares
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.set('socketio', io)
// app.use("/images", express.static(path.join(__dirname, "/images")));  //send files to client

// MongoDb
mongoose.connect('mongodb://127.0.0.1:27017/famebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);


// Upload
app.post("/api/upload", upload.single('file'), async (req, res) => {
  if (req.body.profile)
    await User.findOneAndUpdate({ _id: req.userid.userid }, { profilePicture: req.file.filename })
  else
    await User.findOneAndUpdate({ _id: req.userid.userid }, { coverPicture: req.file.filename })

  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/posts",checkauth, postRoute);
app.use("/api/meme", memeRoute);
app.use("/api/friend",checkauth, friendRoute)

server.listen("5000", () => {
  console.log("Backend is running.");
});

