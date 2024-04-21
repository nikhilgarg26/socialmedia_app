const router = require("express").Router();
const Post = require("../models/Post");
const { upload } = require("../services/storage");

//CREATE POST
router.post("/", upload.single('file'), async (req, res) => {
  let img = ""
  if (req.file) img = req.file.filename

  const newPost = new Post({
    userId: req.userid.userid,
    desc: req.body.desc,
    img
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});


//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  try {
    let posts;
    if (userId) {
      posts = await Post.find({ userId });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);

  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const TYPE = req.body.type
    console.log(TYPE)

    if (TYPE == "like") {
      const id = req.params.id

      await Post.findByIdAndUpdate(id,
        { $addToSet: { likes: req.userid.userid } }, { new: true })

      return res.status(200).json({ msg: "done" })
    }
    else if(TYPE == "unlike"){
      const id = req.params.id

      await Post.findByIdAndUpdate(id,
        { $pull: { likes: req.userid.userid } }, { new: true })

      return res.status(200).json({ msg: "done" })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;