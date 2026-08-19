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
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


UserSchema.methods.validPassword = function (password: string) {
    console.log(password, this.password);
    bcrypt.compare(password, this.password);
}

UserSchema.methods.validPassword = async function (password: string) {
    console.log(password, this.password);
    const result = await bcrypt.compare(password, this.password);
    return result;
}


const User = mongoose.model('User', UserSchema);

export default User;
