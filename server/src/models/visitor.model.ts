// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')

// const saltRounds = 10;
// const Schema = mongoose.Schema;
// const VisitorSchema = new Schema({
//     userName: {
//         type: String,
//         default: '',
//         required: true
//     },
//     password: {
//         type: String,
//         default: '',
//         required: true
//     }
// }, {
//     timestamps: true,
// })

// VisitorSchema.methods.generateHash = function (password: string) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null);
// }

// VisitorSchema.methods.validPassword = function (password: string) {
//     return bcrypt.compareSync(this.password, password);
// }

// const Visitor = mongoose.model('Visitor', VisitorSchema);

// export default Visitor;

import mongoose, { Document, Schema } from "mongoose";

export interface IVisitor extends Document {
    visitorId: string;
    firstSeen: Date;
    lastSeen: Date;
    visitCount: number;
}

const visitorSchema = new Schema<IVisitor>(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        firstSeen: {
            type: Date,
            default: Date.now,
        },

        lastSeen: {
            type: Date,
            default: Date.now,
        },

        visitCount: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IVisitor>("Visitor", visitorSchema);