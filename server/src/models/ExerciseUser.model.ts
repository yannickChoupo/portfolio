import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    log: Array
});

const ExerciseUser = mongoose.model("User", UserSchema);

export default ExerciseUser;
