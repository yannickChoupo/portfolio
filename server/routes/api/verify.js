const verify = require('express').Router();
const UserSession = require('../../models/UserSession.js')

let User = require('../../models/user.model');

//
verify.route('/').get((req, res) => {
    // Get the token
    const { query } = req;
    const { userName } = query;


    // Verify the token is one of a kind deleted
    console.log("Backend find user***************************");
    UserSession.find({
        userNAme: userName,
    }, (err, userFound) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            })
        }
        if (!userFound) {
            console.log(userFound);
            return res.send({
                success: false,
                message: 'Error: User not found'
            })
        }
        return res.send({
            success: true,
            message: 'User authenticated'
        })
    })
})

module.exports = verify;