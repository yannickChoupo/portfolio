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

const Visitor = mongoose.model('Visitor', visitorSchema);


export default Visitor;