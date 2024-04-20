const express = require('express')
const User = require('../models/User')
const { users } = require('../services/socket')
const router = express.Router()

// Friend Req Recieved
router.post('/sendreq', async (req, res) => {

    try {
        const userId = req.userid.userid
        const friendid = req.body.friendid

        await User.findByIdAndUpdate(userId,
            { $addToSet: { sentreq: friendid } }, { new: true })

        await User.findByIdAndUpdate(friendid,
            { $addToSet: { friendreq: userId } }, { new: true })

        res.status(200).json({ message: 'Friend request sent successfully.' });

    } catch (error) {
        res.status(400).json(err.message);
    }

    // console.log(users.get(userId).id)
    // console.log(users.get(friendid).id)

    // if (users.has(userId) && users.has(friendid)) {
    //     const socketS = users.get(userId);
    //     const socketR = users.get(friendid);

    //     if (socketR?.id) {
    //         socketS.to(socketR.id).emit('sentreq', { userId });
    //         res.status(200).json({ message: 'Friend request sent successfully.' });
    //     } else {
    //         res.status(400).json({ error: 'Receiver socket ID is not available.' });
    //     }
    // } else {
    //     res.status(400).json({ error: 'Sender or receiver socket not found.' });
    // }
})

router.post('/accept', async (req, res) => {
    try {
        const friendreqid = req.body.friendreqid
        const userId = req.userid.userid

        await User.findByIdAndUpdate(userId,
            { $addToSet: { friends: friendreqid }, $pull: { friendreq: friendreqid } }, { new: true })

        await User.findByIdAndUpdate(friendreqid,
            { $addToSet: { friends: userId }, $pull: { sentreq: userId } }, { new: true })

        res.status(200).json({ message: 'Friend request sent successfully.' });

    } catch (error) {
        res.status(400).json(err.message);
    }

    // if (users.has(userId) && users.has(friendreqid)) {
    //     const socketS = users.get(userId);
    //     const socketR = users.get(friendreqid);

    //     if (socketR?.id) {
    //         socketS.to(socketR.id).emit('accepted', { userId });
    //         res.status(200).json({ message: 'Friend request sent successfully.' });
    //     } else {
    //         res.status(400).json({ error: 'Receiver socket ID is not available.' });
    //     }
    // } else {
    //     res.status(400).json({ error: 'Sender or receiver socket not found.' });
    // }
})

router.post('/unfriend', async (req, res) => {
    const friendid = req.body.friendid
    const userId = req.userid.userid

    await User.findByIdAndUpdate(userId,
        { $pull: { friends: friendid } }, { new: true })

    await User.findByIdAndUpdate(friendid,
        { $pull: { friends: userId } }, { new: true })
})

module.exports = router