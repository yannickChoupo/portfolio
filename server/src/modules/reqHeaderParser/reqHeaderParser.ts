import { Router, Request, Response } from "express";
const router = Router();

router.get('/', (req: Request, res: Response) => {
    let { headers } = req;
    let software = headers['user-agent'];
    let language = headers['accept-language']
    res.json({
        ipaddress: req.ip,
        language: language,
        software: software
    })
})

export default router;