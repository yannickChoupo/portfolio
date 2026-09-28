// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const TodoSchema = new Schema({
//     id: {
//         type: String,
//         unique: true,
//         default: ''
//     },
//     name: {
//         type: String,
//         default: ''
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     description: {
//         type: String,
//         default: ''
//     }
// }, {
//     timestamps: true,
// })

// const Todo = mongoose.model('Todo', TodoSchema);

// export default Todo;

// import mongoose from "mongoose";

// const TodoSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         completed: {
//             type: Boolean,
//             default: false
//         },

//         description: {
//             type: String,
//             default: ""
//         },

//         project: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Project",
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// const Todo = mongoose.model("Todo", TodoSchema);

// export default Todo;

// import mongoose from "mongoose";

// const TodoSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         completed: {
//             type: Boolean,
//             default: false
//         },

//         description: {
//             type: String,
//             default: ""
//         },

//         project: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Project",
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// const Todo = mongoose.model("Todo", TodoSchema);

// export default Todo;

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        requirement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Requirement",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "TODO",
                "IN_PROGRESS",
                "DONE"
            ],
            default: "TODO"
        },

        repositoryId: {
            type: String,
            enum: ["backend", "frontend", "device"],
            required: true,
        },

        // scope: {
        //     type: String,
        //     enum: [
        //         "FRONTEND",
        //         "BACKEND",
        //         "DEVICE"
        //     ],
        //     required: true,
        //     index: true
        // },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model(
    "Todo",
    TodoSchema
);

export default Todo;