const signOut = require('express').Router();
let User = require('../../models/user.model');
const UserSession = require('../../models/UserSession.js')
//
signOut.route('/').post((req, res) => {
    console.log("BACKENd : signout",req.data)
    // Get the token

    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind not deleted
    UserSession.findOneAndUpdate({
        userId: token,
        isDeleted: false,
    },{
        $set: {
            isDeleted: true
        }
    },null , (err, session) => {
        if(err) {
            console.log(err)
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        console.log(session);
        return res.send({
            success: true,
            message: 'successfully signOut'
        })
    })
})

module.exports = signOut;