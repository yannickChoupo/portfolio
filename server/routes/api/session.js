const UserSession = require('../../models/usersession');
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

        res.send({
            session: token
        })
    } catch (error) {
        console.log(`Error: something went wrong: ${error}`);
    }
});

module.exports = router;