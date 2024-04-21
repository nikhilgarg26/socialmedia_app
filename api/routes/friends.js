const express = require('express')
const User = require('../models/User')
const { users } = require('../services/socket')
const router = express.Router()

// Friend Req Recieved
router.post('/sendreq', async (req, res) => {

    try {
        const userId = req.userid.userid
        const friendid = req.body.friendreqid

        const d = await User.findByIdAndUpdate(userId,
            { $addToSet: { sentreq: friendid } }, { new: true })

        await User.findByIdAndUpdate(friendid,
            { $addToSet: { friendreq: userId } }, { new: true })

        res.status(200).json(d);

    } catch (error) {
        res.status(400).json(err.message);
    }
})

router.post('/accept', async (req, res) => {
    try {
        const friendreqid = req.body.friendreqid
        const userId = req.userid.userid

        const d = await User.findByIdAndUpdate(userId,
            { $addToSet: { friends: friendreqid }, $pull: { friendreq: friendreqid } }, { new: true })

        await User.findByIdAndUpdate(friendreqid,
            { $addToSet: { friends: userId }, $pull: { sentreq: userId } }, { new: true })

            console.log(d)

        res.status(200).json(d);

    } catch (error) {
        res.status(400).json(err.message);
    }
})

router.post('/unfriend', async (req, res) => {
    try {
        const friendid = req.body.friendid
        const userId = req.userid.userid

        const d = await User.findByIdAndUpdate(userId,
            { $pull: { friends: friendid } }, { new: true })

        await User.findByIdAndUpdate(friendid,
            { $pull: { friends: userId } }, { new: true })

        res.status(200).json(d);

    } catch (error) {
        res.status(400).json(err.message);
    }
})

router.post('/delete', async (req, res) => {

    try {
        const userId = req.userid.userid
        const friendid = req.body.friendreqid

        await User.findByIdAndUpdate(userId,
            { $pull: { friendreq: friendid } }, { new: true })

        await User.findByIdAndUpdate(friendid,
            { $pull: { sentreq: userId } }, { new: true })

        res.status(200).json(d);

    } catch (error) {
        res.status(400).json(err.message);
    }
})

module.exports = router