const jwt = require('jsonwebtoken')

const SECRET = "FAMEBOOK"

function setUser(id) {
    return jwt.sign({
        userid:id
    }, SECRET)
}

function getUser(token){
    return jwt.verify(token, SECRET)
}

module.exports = {setUser, getUser}