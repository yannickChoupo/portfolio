const signUp = require('express').Router();
let User = require('../../models/user.model');

//
signUp.route('/').post((req, res) => {
    const { body } = req;
    let {
        userName,
        password
    } = body;
    if (!userName) {
        return res.send({
            success: false,
            message: 'Error: userName cannot be blank'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank'
        })
    }
//****************************************************************************
//         // Steps:
//         // 2. save
    User.find({ userName: userName }, (err, personFound) => {
        console.log(`Person found ${personFound.length}`);
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error " + err
            });
        }
        if (personFound[0]) {
            res.send({
                success: false,
                message: 'Error: account already exist'
            });
        }else{
            // Create a new user
            const newUser = new User();
            newUser.userName = userName;
            newUser.password = newUser.generateHash(password);

            // Save the new user
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Sign up successful',
                    user: user
                })
            })
        }
    })
});
module.exports = signUp;
