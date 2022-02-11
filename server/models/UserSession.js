const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    id: {
        type: String,
        default: '',
        unique: true
    },
    hostName: {
        type: String,
        default: ''
    },
    userAgent: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },

}, { timestamp: true })

module.exports = mongoose.model('UserSession', UserSessionSchema);