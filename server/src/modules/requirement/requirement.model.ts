import mongoose from "mongoose";

export type RequirementScope =
    | "FRONTEND"
    | "BACKEND"
    | "DEVICE"
    | "OVERALL";



export interface IRequirement {
    _id: mongoose.Types.ObjectId;
    project: mongoose.Types.ObjectId;
    name: string;
    description: string;
    scope: RequirementScope;
}

const RequirementSchema = new mongoose.Schema<IRequirement>(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        scope: {
            type: String,
            enum: [
                "OVERALL",
                "FRONTEND",
                "BACKEND",
                "DEVICE"
            ],
            default: "OVERALL"
        }
    },
    {
        timestamps: true
    }
);

const Requirement = mongoose.model<IRequirement>(
    "Requirement",
    RequirementSchema
);

export default Requirement;