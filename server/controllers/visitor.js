const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Visitor = require('../models/visitor.model');
const UserSession = require('../models/UserSession');
/////////////////************************************************************
/////////////////////Secret primary key : test
////////////////////***********************************************
/**
 * implement the logic to store a Visitor in the database
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */

const visitorSignIn = async (req, res) => {
    // console.log("REQUEST : ",req);
    const {body} = req;
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
    try {
        const existingVisitor = await Visitor.findOne({userName});
        if (!existingVisitor) {
            return res.send({
                success: false,
                message: 'Error: account doesn\'t exist'
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingVisitor.password);
        console.log("result : ", isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.send({
                success: false,
                message: 'Error: password incorrect'
            })
        }
        const token = jwt.sign(
            {
                userName: existingVisitor.userName,
                id: existingVisitor._id
            }, 'test',
            {
                expiresIn: "1h"
            });
        return res.send({
            success: true,
            message: 'successful sign in',
            visitor: existingVisitor,
            token: token
        })
    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong ${err}`
        })
    }

}

const visitorSignUp = async function (req, res) {
    console.log("sign up request : ", req.body);
    const {body} = req;
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
    Visitor.find({userName: userName}, (err, visitorFound) => {
        console.log(`Person found ${visitorFound.length}`);
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error " + err
            });
        }
        if (visitorFound[0]) {
            res.send({
                success: false,
                message: 'Error: account already exist'
            });
        }
        // else {
        const newVisitor = new Visitor();
        newVisitor.userName = userName;
        newVisitor.password = newVisitor.generateHash(password);

        console.log("new visitor : ", newVisitor);

        // // Save the new user
        newVisitor.save((err, visitor) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            console.log("saved visitor : ", visitor);
            return res.send({
                success: true,
                message: 'Sign up successful',
            })
        })
    })
};
const visitorSignOut = async (req, res) => {
    // console.log(req);
    const {body} = req;
    let {
        visitorName,
        visitorMessage
    } = body;
    console.log("SERVER LOGOUT : ", visitorName, visitorMessage);
    Visitor.findOneAndDelete({ userName: visitorName}, (err, docs) => {
        if (err) {
            return res.send({
                success: false,
                message: `something went wrong , visitor couldn't be deleted ${err}`
            })
        }
        return res.send({
            success: true,
            message: "visitor successfully deleted"
        })
    })
}
// console.log("DOCS : ", docs);
// const userSession = new UserSession();
// userSession.userId = visitorName;
// userSession.message = message;

// userSession.save((err, doc) => {
//     if (err) {
//         return res.send({
//             success: false,
//             message: 'Error: server error'
//         })
//     }
//
// })
module.exports = {
    visitorSignIn,
    visitorSignUp,
    visitorSignOut
};