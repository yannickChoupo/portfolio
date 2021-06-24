const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10;
const VisitorSchema = new Schema({
    userName: {
        type: String,

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
},{
    timestamps: true,
})

VisitorSchema.methods.generateHash = (password) => {
    console.log(password.toString());
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}
VisitorSchema.methods.validPassword = (password) => {
    console.log(password,this.password)
    return bcrypt.compareSync(password, this.password)
    // return bcrypt.compareSync(password, this.password);
}

const Visitor = mongoose.model('User',VisitorSchema);

module.exports = Visitor;