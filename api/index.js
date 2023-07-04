const express=require("express");
const mongoose=require("mongoose");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/post");
const cors = require('cors');
const multer = require("multer");
const path = require("path");


const app=express();
app.use(express.json());
app.use(cors());

// MongoDb
mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);


app.use("/images", express.static(path.join(__dirname, "/images")));
console.log(__dirname);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen("5000", () => {
    console.log("Backend is running.");
  });

