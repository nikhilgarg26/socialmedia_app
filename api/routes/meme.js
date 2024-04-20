const router = require("express").Router();
const axios = require('axios');

router.get("/", async (req, res) => {
    try {
        const response = await axios.get('https://meme-api.com/gimme/wholesomememes/10');
        const memes=response.data.memes;
        res.status(200).json(memes);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;