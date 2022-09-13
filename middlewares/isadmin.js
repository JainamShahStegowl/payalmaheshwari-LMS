const Users = require('../models/users').Users

async function isAdmin(req, res, next) {
    let getUser = req.user
    let user = await getUser.populate('role_id').execPopulate();

    /* 
    ** checking department course topic constraint: By admin only 
    ** checking user update and delete constraints: By admin and user itself
    */
   
    if (user.role_id[0].name.toLowerCase() == "admin" || user._id == req.params.id) {
        next()
    }
    else {
        res.sendStatus(403)
    }
}


module.exports = isAdmin