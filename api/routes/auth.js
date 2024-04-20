const router = require("express").Router();
const { randomBytes, createHmac } = require("crypto");

const User = require("../models/User.js");
const { setUser } = require("../services/auth.js");
const { checkauth } = require("../middlewares/authMid.js");

//REGISTER
router.post("/register", async (req, res) => {
    const body = req.body
    
    try {
        const salt = randomBytes(16).toString()
        
        if (!body.password) return res.json({ msg: "Password required" })
        
        const password = createHmac('sha256', salt).update(body.password).digest('hex')
        
        const newUser = new User({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            salt,
            password
        });

        const user = await newUser.save()
        
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({err});
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const body = req.body;
    // const io = req.app.get('socketio')
    
    try {
      const user = await User.findOne({ email: body.email });
    
      if (!user) {
        throw new Error('User not found');
      }
  
      const pass = createHmac('sha256', user.salt)
        .update(body.password)
        .digest('hex');
  
      if (pass !== user.password) {
        throw new Error('Incorrect Password');
      }
  
      const token = setUser(user._id);
      res.cookie('uuid', token);
  
      // Convert Mongoose document to a plain JavaScript object
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      delete userWithoutPassword.salt;
  
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

//GET USER
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if(!user) throw new Error('No user found')

        const sendUser = user.toObject()
        delete sendUser.password
        delete sendUser.salt
        delete sendUser.sentreq
        delete sendUser.createdAt
        delete sendUser.updatedAt
        delete sendUser.friendreq
        
        res.status(200).json(sendUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

//UPDATE USER
router.put("/update",checkauth, async (req, res) => {
    try {
        
        const user = await User.findByIdAndUpdate(req.userid.userid,
            {
                $set: req.body,
            },
            { new: true }
        );
        // !user && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        // console.log(user._doc);
        res.status(200).json(others);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

//Searchbar User
router.get("/", async (req, res) => {
    const search = req.query.filter;
    try {
        const user = await User.find();
        console.log(search);

        const filteredData = user.filter((item) => {
            // console.log(Object.values(item).join('').toLowerCase());
            // console.log(item);
            const t = item.firstname + item.lastname;
            return t.toLowerCase().includes(search.toLowerCase())
        })



        res.status(200).json(filteredData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
