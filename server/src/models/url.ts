import mongoose from "mongoose";

let urlSchema = new mongoose.Schema(
    {
        original_url: {
            type: String,
            required: true
        },

        short_url: {
            type: Number
        }
    }, {
    timestamps: true
})

let Url = mongoose.model('Url', urlSchema);

export default Url;