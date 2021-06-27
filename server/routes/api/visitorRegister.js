const VisitorRegister = require('express').Router();
let Visitor = require('../../models/visitor.model');

VisitorRegister.route('/').post((req, res) => {
    const { body } = req;
    let {
        userName,
        password
    } = body;
    console.log(body);
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
    Visitor.find({ userName: userName }, (err, visitor) => {
        console.log(`Person found ${visitor.length}`);
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error " + err
            });
        }
        if (visitor[0]) {
            res.send({
                success: false,
                message: 'Error: account already exist'
            });
        }else{
            // Create a new user
            const newVisitor = new Visitor();
            newVisitor.userName = userName;
            newVisitor.password = newVisitor.generateHash(password);

            // Save the new user
            newVisitor.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Sign up successful',
                    Visitor: user
                })
            })
        }
    })
});
module.exports = VisitorRegister;
