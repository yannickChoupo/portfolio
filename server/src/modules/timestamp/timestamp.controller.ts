import { NextFunction, Request, Response } from "express";
import * as timestampService from "./timestamp.services";

const getCurrentTimestamp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timestamp = await timestampService.getCurrentTimestamp(req.params.username);
        res.status(200).json(timestamp);
    } catch (error) {
        next(error);
    }
}

const getCurrentTimestampByDate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const timestamp = await timestampService.getCurrentTimestamp(req.params.username);
        res.status(200).json(timestamp);
    } catch (error) {
        next(error);
    }
}


export { getCurrentTimestamp, getCurrentTimestampByDate };