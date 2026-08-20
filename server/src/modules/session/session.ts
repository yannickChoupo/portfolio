
import { Request, Response, Router, NextFunction } from 'express';
const UserSession = require('../../models/usersession.model');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction ) => {
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
        // console.error(`Error: something went wrong: ${error}`);
        return next(error);

    }
});

router.get('/all', async (_req: Request, res: Response,  next: NextFunction) => {

    try {
        const curSession = await UserSession.find();

        return res.send({
            success: true,
            sessions: curSession,
            message: 'sessions'
        })
    } catch (error) {
        console.error(`Error: something went wrong: ${error}`);
        return next(error);

    }
});

router.post('/:id', async (req: Request, res: Response,  next: NextFunction) => {
    const { id } = req.params;
    try {
        const existingSession = await UserSession.find({ id: id });

        if (!existingSession[0]) {
            return res.send({
                success: false,
                message: 'session doesn\'t exist'
            })
        }

        // const remainingSession = 
        await UserSession.deleteOne({ id: id })

        res.send({
            success: true,
            message: 'session deleted'
        })
    } catch (error) {
        console.error(`Error: something went wrong: ${error}`);
       return next(error);

    }
});


export default router;