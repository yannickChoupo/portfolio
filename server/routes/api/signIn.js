const signIn = require('express').Router();
const User = require('../../models/user.model');
const UserSession = require('../../models/UserSession.js')
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
signIn.route('/').post((req, res) => {
    console.log("sign In request ....");
    const { body } = req;
    let {
        userName,
        password
    } = body;
    // console.log("*******************",userName,password);
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
    User.find({ userName: userName }, (err, personFound) => {
        console.log(`Person found ${personFound.length}`);
        const user = personFound[0];
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
        }

        console.log("user found" ,user);
        console.log("check password****************************");
        console.log("password check Result /////// ",user.validPassword(password));
        if(!isValidPassword(user,password)) {
        // // if(!isValidPassword(user, password)){
        //     console.log("password not valid");
            return res.send({
                success: false,
                message: "Error password invalid"
            })
        }
        // with the correct user

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
                // user: doc._id
            })
        })
    })
});
module.exports = signIn;
