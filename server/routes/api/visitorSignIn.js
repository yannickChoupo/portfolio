const VisitorSignIn = require('express').Router();
const Visitor = require('../../models/visitor.model');

const UserSession = require('../../models/UserSession.js');
const bcrypt = require('bcrypt')
//
const isValidPassword = (user, password) => {
    // const result = bcrypt.compareSync(password, user.password);
    // if (result) {
    //     console.log("Password correct");
    // } else {
    //     // console.log(user.password,password)
    //     console.log("Password wrong");
    // }
    return  bcrypt.compareSync(password, user.password);
}
VisitorSignIn.route('/').post((req, res) => {
    console.log("sign In request ....");
    const { body } = req;
    let {
        userName,
        password
    } = body;
    console.log("*******************",userName,password);
    if(!userName) {
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
    // Steps:
    // 1. find the user
    // 2. save
    // User.find({ email: email }, (err, users) => {
    Visitor.find({ userName: userName }, (err, visitor) => {
        console.log(`Person found ${visitor.length}`);
        const user = visitor[0];
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        if (!user) {
            return res.send({
                success: false,
                message: 'Error: user doesn\'t exist'
            })
        } else {
            console.log("user found" ,user);
            // console.log("password check Result ",user.validPassword(password));
            if(!isValidPassword(user,password)) {
                return res.send({
                    success: false,
                    message: "Error password invalid"
                })
            } else {
                const userSession = new UserSession();
                userSession.userId = user._id;
                userSession.save((err, doc) => {
                    if(err) {
                        return res.send({
                            success: false,
                            message: 'Error: server error'
                        })
                    }
                    return res.send({
                        success: true,
                        message: 'Valid sign in',
                        user: user,
                    })
                })
            }
        }
    })
});
module.exports = VisitorSignIn;
