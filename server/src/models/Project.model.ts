import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "frontend",
                "backend",
                "fullstack",
                "visualization"
            ],
            required: true
        },

        status: {
            type: String,
            enum: [
                "available",
                "unavailable",
                "draft"
            ],
            default: "draft"
        },

        description: {
            type: String,
            required: true
        },

        longDescription: {
            type: String,
            default: ""
        },

        techUsed: [{
            type: String
        }],

        features: [{
            type: String
        }],

        githubUrl: {
            type: String,
            default: ""
        },

        liveUrl: {
            type: String,
            default: ""
        },

        featured: {
            type: Boolean,
            default: false
        },

        order: {
            type: Number,
            default: 0
        },

        endpoints: [{
            method: {
                type: String,
                enum: ["GET", "POST", "PUT", "PATCH", "DELETE"]
            },

            path: String,

            description: String
        }]
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;