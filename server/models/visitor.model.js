const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10;
const Schema = mongoose.Schema;
const VisitorSchema = new Schema({
    userName: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true,
})

VisitorSchema.methods.generateHash = function (password) {
    console.log(password.toString());
    return bcrypt.hashSync(password,bcrypt.genSaltSync(saltRounds),null);
}
VisitorSchema.methods.validPassword = function (password) {
    console.log(password,this.password)
    return bcrypt.compareSync(this.password,password);
}

const Visitor = mongoose.model('Visitor',VisitorSchema);

module.exports = Visitor;