const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    log: Array
})

const ExerciseUser = mongoose.model("User", UserSchema)

module.exports = ExerciseUser;
