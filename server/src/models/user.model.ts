const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        unique: true,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

UserSchema.methods.generateHash = async function (password: string) {
    console.log(password.toString());
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}


UserSchema.methods.validPassword = async function (password: string) {
    console.log(password, this.password);
    const result = await bcrypt.compare(password, this.password);
    return result;
}


// const User = mongoose.model('User', UserSchema);

// const User =
//   mongoose.models.User ||
//   mongoose.model('User', UserSchema);

export default mongoose.models.User;
