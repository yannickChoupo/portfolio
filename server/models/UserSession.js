const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    createdAt: {
        type: String,
        default: ''
    },
    deletedAt: {
        type: Date,
        default: Date.now()
    },
    message: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('UserSession',UserSessionSchema);