const UserSession = require('../../models/usersession.model');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const { headers } = req;

    try {
        const session = new UserSession();
        session.hostName = headers.host;
        session.userAgent = headers['user-agent'];
        session.id = session._id;


        const savedSession = await session.save(session);

        const token = jwt.sign(
            {
                id: savedSession.id,
                createdAt: savedSession.createdAt
            }, "test",
            {
                expiresIn: "1h"
            });

        return res.send({
            success: true,
            session: token,
            message: 'session added'
        })
    } catch (error) {
        console.log(`Error: something went wrong: ${error}`);
    }
});
router.get('/all', async (req, res) => {

    try {
        const curSession = await UserSession.find();

        return res.send({
            success: true,
            sessions: curSession,
            message: 'sessions'
        })
    } catch (error) {
        console.log(`Error: something went wrong: ${error}`);
    }
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("session delete request: ", id);
    try {
        const existingSession = await UserSession.find({ id: id });

        if (!existingSession[0]) {
            return res.send({
                success: false,
                message: 'session doesn\'t exist'
            })
        }

        const remainingSession = await UserSession.deleteOne({ id: id })

        console.log(remainingSession);
        res.send({
            success: true,
            message: 'session deleted'
        })
    } catch (error) {
        console.log(`Error: something went wrong: ${error}`);
    }
});

module.exports = router;