const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10;
// var password = "Fldjdlökjfdgh@df";
const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     firstName: {
//         type: String,
//         default: ''
//     },
//     lastName: {
//         type: String,
//         default: ''
//     },
//     email: {
//         type: String,
//         default: ''
//     },
//     password: {
//         type: String,
//         default: ''
//     },
//     isDeleted: {
//         type: Boolean,
//         default: false
//     },
//
// },{
//     timestamps: true,
// })
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        default: ''
    },
    password: {
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

UserSchema.methods.generateHash = (password) => {
    console.log(password.toString());
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
UserSchema.methods.validPassword = function (password) {
    console.log(password, this.password);
    console.log("compare passwords : *********************");
    bcrypt.compare(password, this.password, function (err, res) {
        if (err) {
            return  err;
        }
        return !!res;
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
