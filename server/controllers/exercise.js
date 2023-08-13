// import { model } from "mongoose";
const ExerciseUser = require('../models/ExerciseUser.model');
const dns = require('dns');


async function registerExerciseUser(req, res) {
    const { username } = req.body;
    try {
        const existingUser = await ExerciseUser.find({ username })
        if (existingUser[0]) {
            res.send({
                error: "User already exist",
                id: existingUser[0]._id
            })
            return
        }

        const newUser = new ExerciseUser();
        newUser.username = username;
        const savedUser = await newUser.save()
        res.send({
            username,
            _id: savedUser._id
        })
    } catch (error) {
        console.log(error)
        res.send({
            message: "backend : something went wrong"
        })
    }
}

const addExercise = async (req, res) => {
    const { id } = req.params;
    console.log("ID : ", id);
    console.log("request : ", req.body);
    let { description, duration, date } = req.body;

    try {
            const existingUser = await ExerciseUser.find({ _id: id });
            if (!existingUser[0]) {
                res.send({
                    error: "user not found!!"
                })
                return
            }
            let findedUser = existingUser[0];
            let newExercise = { description, duration, date }
            console.log("new ex : ", newExercise);
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
        console.log(error);
        res.send({
            message: `backend : something went wrong : ${error.message}`
        })
    }
}
const getLogs = async (req, res) => {
    const { _id } = req.params;
    let { from, to, limit } = req.query;
    try {
        const existingUser = await ExerciseUser.find({ _id });
        if (!existingUser[0]) {
            res.send({
                error: "user not found!!"
            })
            return
        }
        let findedUser = existingUser[0];

        const count = findedUser.log.length;
        let { log, username } = findedUser;
        findedUser.log.forEach((log) => {
            log.dur = parseInt(log.dur);
            return log;
        })

        limit = parseInt(limit);

        if (from || to || limit) {
            let filteredLogs;
            console.log("Query provided", from, to, limit);
            if (!from && !to && limit) {
                console.log("Just limit provided")
                filteredLogs = log.reduce((acc, curExercise) => {
                    console.log(acc.length);
                    if (acc.length < limit) {
                        acc.push(curExercise);
                    }
                    return acc;
                }, [])

                res.send({
                    username,
                    _id,
                    count,
                    log: filteredLogs
                })
                return
            }
            console.log("from and to provided")
            from = new Date(from);
            to = new Date(to);
            if (from.toUTCString() === "Invalid Date" || to.toUTCString() === "Invalid Date") {
                res.send({
                    error: "Invalid query String format"
                })
                return
            }
            filteredLogs = log.reduce((acc, curExercise) => {
                let curDate = new Date(curExercise.date);
                console.log(acc.length);
                if (curDate.getTime() >= from.getTime() &&
                    curDate.getTime() <= to.getTime()) {
                    acc.push(curExercise);
                }
                return acc;
            }, [])
            res.send({
                username,
                _id,
                count,
                log: filteredLogs
            })
            return
        }
        res.send({
            username,
            _id,
            count,
            log
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: "backend : something went wrong"
        })
    }
}
module.exports = {
    registerExerciseUser,
    addExercise,
    getLogs
}