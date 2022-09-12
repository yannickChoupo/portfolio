const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Visitor = require('../models/visitor.model');
const UserSession = require('../models/UserSession');
/////////////////***********************************************
/////////////////      Secret primary key : test
/////////////////***********************************************
/**
 * implement the logic to store a Visitor in the database
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const visitorSignIn = async (req, res) => {
    const { body } = req;
    let {
        userName,
        password
    } = body;

    // check if the credentials are not empty
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
        const existingVisitor = await Visitor.findOne({ userName });

        if (!existingVisitor) {
            return res.send({
                success: false,
                message: 'Error: account doesn\'t exist'
            });
        }

        // Authenticate password
        const isPasswordCorrect = await bcrypt.compare(password, existingVisitor.password);
        console.log("result : ", isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.send({
                success: false,
                message: 'Error: password incorrect'
            })
        }
        console.log("EXISTING USER : ", existingVisitor)
        // Create JWT string with secret
        const token = jwt.sign(
            {
                visitorName: existingVisitor.userName,
                id: existingVisitor.id,
                createdAt: existingVisitor.createdAt
            }, "test",
            {
                expiresIn: "1min"
            });
        // Send back the visitor information in from of a token
        return res.send({
            success: true,
            message: 'successful sign in',
            token: token,
            // visitor: {
            //     visitorName: existingVisitor.visitorName
            // }
        })
    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong ${error}`
        })
    }
}

const visitorSignUp = async (req, res) => {
    console.log("sign up request : ", req.body);
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
    try {

        // Check exiting visitor
        const existingVisitor = await Visitor.find({ userName: userName });
        console.log("existing visitor : ", existingVisitor);
        if (existingVisitor[0]) {
            return res.send({
                success: false,
                message: 'Error: account already exist'
            });
        }

        // Save visitor
        const newVisitor = new Visitor();
        newVisitor.userName = userName;
        newVisitor.password = newVisitor.generateHash(password);
        const savedVisitor = await newVisitor.save();
        return res.send({
            success: true,
            message: 'Sign up successful'
        });
    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong ${error}`
        })
    }
};
const visitorSignOut = async (req, res) => {
    // console.log(req);
    const {
        body
    } = req;
    let {
        userId,
        createdAt,
        visitorName,
        message
    } = body;
    // if(message) {
    try {
        const newSession = new UserSession();
        newSession.userId = userId;
        newSession.createdAt = createdAt;
        newSession.userName = visitorName;
        newSession.message = message;

        const savedSession = await newSession.save();
        Visitor.findOneAndDelete({ userName: visitorName }, () => {
            return res.send({
                success: true,
                message: "visitor successfully deleted"
            })
        })
    } catch (e) {
        return res.send({
            success: false,
            message: `something went wrong ${e}`
        })
    }
}
module.exports = {
    visitorSignIn,
    visitorSignUp,
    visitorSignOut
};