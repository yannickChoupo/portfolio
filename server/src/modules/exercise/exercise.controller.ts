import { NextFunction, Request, Response } from "express";
import ExerciseUser from "../../models/ExerciseUser.model";
import { ErrorResponse, ExerciseLog, ExerciseUserResponse, LogParams, LogQuery } from "../../types/api";
import * as ExerciseService from "./exercise.services";
import { AppError } from "../../errors/AppError";
import User from "../../models/user.model";

const getAllExerciseUsers = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
};

const registerExerciseUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { username } = req.body;
    try {
        const existingUser = await ExerciseService.getExerciseUser(username);

        if (existingUser[0]) {
            throw new AppError('User already exists', 409);
        }

        const newUser = new ExerciseUser({ username });
        const savedUser = await newUser.save()
        res.send({
            username,
            _id: savedUser._id.toString()
        })
    } catch (error) {
        next(error);
    }
}

const addExercise = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const { id } = req.params;

    console.log("ID : ", id);
    console.log("request : ", req.body);
    let { description, duration, date } = req.body;
    if (date === '' || typeof date === 'undefined') {
        date = new Date().toDateString();
    } else {
        date = new Date(date).toDateString();
    }

    console.log("new req : ", id, date,);

    try {
        const existingUser = await ExerciseUser.find({ _id: id });
        let findedUser = existingUser[0];
        if (!existingUser[0]) {
            res.send({
                _id: id,
                username: findedUser.username,
                date,
                duration,
                description
            })
            return
        }
        // let findedUser = existingUser[0];
        let newExercise = { description, duration, date }
        let newExercisesArr = [...findedUser.log, newExercise]
        duration = parseInt(duration);
        const newUser = await ExerciseUser.findOneAndUpdate(
            { _id: id }, { log: newExercisesArr })
        res.send({
            _id: id,
            username: findedUser.username,
            date,
            duration,
            description
        })
    } catch (error) {
        next(error);
    }
}
// const getLogs = async (req: Request,
//     res: Response) => {
//     const { _id } = req.params;
//     let { from, to, limit } = req.query;
//     try {
//         const existingUser = await ExerciseUser.find({ _id });
//         if (!existingUser[0]) {
//             res.send({
//                 error: "user not found!!"
//             })
//             return
//         }
//         let findedUser = existingUser[0];

//         const count = findedUser.log.length;
//         let { log, username } = findedUser;
//         findedUser.log.forEach((log: any) => {
//             log.dur = parseInt(log.dur);
//             return log;
//         })

//         limit = parseInt(limit as string);

//         if (from || to || limit) {
//             let filteredLogs;
//             console.log("Query provided", from, to, limit);
//             if (!from && !to && limit) {
//                 console.log("Just limit provided")
//                 filteredLogs = log.reduce((acc, curExercise) => {
//                     console.log(acc.length);
//                     if (acc.length < limit) {
//                         acc.push(curExercise);
//                     }
//                     return acc;
//                 }, [])

//                 res.send({
//                     username,
//                     _id,
//                     count,
//                     log: filteredLogs
//                 })
//                 return
//             }
//             console.log("from and to provided")
//             from = new Date(from);
//             to = new Date(to);
//             if (from.toUTCString() === "Invalid Date" || to.toUTCString() === "Invalid Date") {
//                 res.send({
//                     error: "Invalid query String format"
//                 })
//                 return
//             }
//             filteredLogs = log.reduce((acc, curExercise) => {
//                 let curDate = new Date(curExercise.date);
//                 console.log(acc.length);
//                 if (curDate.getTime() >= from.getTime() &&
//                     curDate.getTime() <= to.getTime()) {
//                     acc.push(curExercise);
//                 }
//                 return acc;
//             }, [])
//             res.send({
//                 username,
//                 _id,
//                 count,
//                 log: filteredLogs
//             })
//             return
//         }
//         res.send({
//             username,
//             _id,
//             count,
//             log
//         })
//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: "backend : something went wrong"
//         })
//     }
// }

// interface ExerciseLog {
//     description: string;
//     duration: number;
//     date: string;
// }

// interface ExerciseUserResponse {
//     username: string;
//     _id: string;
//     count: number;
//     log: ExerciseLog[];
// }

// interface ErrorResponse {
//     error: string;
// }

// interface LogParams {
//     _id: string;
// }

// interface LogQuery {
//     from?: string;
//     to?: string;
//     limit?: string;
// }

const getLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

    const { _id } = req.params;
    const { from, to, limit: limitParam } = req.query;

    try {
        const existingUser = await ExerciseUser.find({ _id });

        if (!existingUser[0]) {
            res.status(404).json({
                error: "user not found!!"
            });
            return;
        }

        const findedUser = existingUser[0];

        const { log, username } = findedUser;
        const count = log.length;

        const normalizedLog: ExerciseLog[] = log.map(
            (exercise: ExerciseLog) => ({
                ...exercise,
                duration: Number(exercise.duration)
            })
        );

        /*
         * Validate limit
         */
        let limit: number | undefined;

        if (limitParam !== undefined) {
            if (typeof limitParam !== 'string') {
                res.status(400).json({
                    error: "Invalid limit"
                });
                return;
            }

            limit = Number.parseInt(limitParam, 10);

            if (Number.isNaN(limit) || limit < 1) {
                res.status(400).json({
                    error: "Limit must be a positive number"
                });
                return;
            }
        }

        /*
         * Only limit
         */
        if (
            from === undefined &&
            to === undefined &&
            limit !== undefined
        ) {
            const filteredLogs = normalizedLog.slice(0, limit);

            res.json({
                username,
                _id,
                count,
                log: filteredLogs
            });

            return;
        }

        /*
         * from / to filtering
         */
        if (from !== undefined || to !== undefined) {

            if (
                typeof from !== 'string' ||
                typeof to !== 'string'
            ) {
                res.status(400).json({
                    error: "Both 'from' and 'to' are required"
                });
                return;
            }

            const fromDate = new Date(from);
            const toDate = new Date(to);

            if (
                Number.isNaN(fromDate.getTime()) ||
                Number.isNaN(toDate.getTime())
            ) {
                res.status(400).json({
                    error: "Invalid query string date format"
                });
                return;
            }

            const filteredLogs = normalizedLog.filter(
                (exercise: ExerciseLog) => {
                    const exerciseDate = new Date(exercise.date);

                    return (
                        exerciseDate.getTime() >= fromDate.getTime() &&
                        exerciseDate.getTime() <= toDate.getTime()
                    );
                }
            );

            res.json({
                username,
                _id,
                count,
                log: filteredLogs
            });

            return;
        }

        /*
         * No query parameters
         */
        res.json({
            username,
            _id,
            count,
            log: normalizedLog
        });

    } catch (error: unknown) {
        console.error(error);

        next(error);
    }
};

export { addExercise, registerExerciseUser, getLogs, getAllExerciseUsers };