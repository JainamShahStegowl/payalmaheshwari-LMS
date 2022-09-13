const jwt = require('jsonwebtoken');
const Users = require('../models/users').Users;

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET, async (err, user) => {
        if (err) return res.sendStatus(403)
        else{
            getUser = await Users.find({email:user.email})
            req.user = getUser[0]
            next()
        }       
    })
}

module.exports = authenticateToken