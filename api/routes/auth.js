const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        // console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        // console.log(hashedPass);
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPass,
        });
        
        const user = await newUser.save();
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        // not gonna take password
        const { password, ...others } = user._doc;
        // console.log(user._doc);
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        !user && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        // console.log(user._doc);
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE USER
router.put("/:userId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId,
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
        res.status(500).json(err);
    }
});

//GET USER
router.get("/", async (req, res) => {
    const search = req.query.filter;
    try {
        const user = await User.find();
        console.log(search);

        const filteredData = user.filter((item) => {
            // console.log(Object.values(item).join('').toLowerCase());
            // console.log(item);
            const t=item.firstname + item.lastname;
            return t.toLowerCase().includes(search.toLowerCase())
        })

        

        res.status(200).json(filteredData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
