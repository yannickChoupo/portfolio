const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;