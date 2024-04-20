const { getUser } = require("../services/auth")

async function checkauth(req, res, next) {
    try {
        const token = req.cookies.uuid

        if (!token) {
            throw new Error("Login required!!")
        }

        const userId = getUser(token)
        req.userid = userId
    } catch (error) {
        return res.status(400).json(error.message)
    }

    return next()
}

module.exports = { checkauth }