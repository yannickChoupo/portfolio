const router = require('express').Router();
const UserSession = require('../models/userSession');

const resquestMiddleware = async function (req, res, next) {
    const { headers } = req;

    const { session } = req.body;

    try {
        const existingSession = await UserSession.find({ id });
        console.log(existingSession[0]);
        if (existingSession[0]) {
            // return;
            next();
        }
        const session = new UserSession();
        session.hostName = headers.host;
        session.userAgent = headers['user-agent'];
        session.id = session._id;

        const savedSession = await session.save(session);

        // const token = jwt.sign(
        //     {
        //         visitorName: savedSession.userName,
        //         id: existingVisitor.id,
        //         createdAt: existingVisitor.createdAt
        //     }, "test",
        //     {
        //         expiresIn: "1h"
        //     });
        res.send({
            // token: token
        })
        next();
    } catch (error) {
        console.log(`Error: something went wrong: ${error}`);
        next()
    }
}

module.exports = resquestMiddleware;