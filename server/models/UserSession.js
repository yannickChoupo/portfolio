const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('UserSession',UserSessionSchema);