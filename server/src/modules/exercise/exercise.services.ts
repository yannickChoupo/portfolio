import bcrypt from 'bcryptjs'
import User from '../../models/user.model'
import ExerciseUser from '../../models/ExerciseUser.model'



export const getExerciseUser = async (username: string) => {
    return await ExerciseUser.find({ username });
}

export const getAllExerciseUsers = async () => {
    return await ExerciseUser.find();
}