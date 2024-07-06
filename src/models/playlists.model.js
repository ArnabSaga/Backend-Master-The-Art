import mongoose, { Schema } from "mongoose";

const playListsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minleght: 20,
            maxlenght: 1000,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    },
    {
        timestamps: true
    }
);

export const PlayList = mongoose.model("PlayList", playListsSchema);