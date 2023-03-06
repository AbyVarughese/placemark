import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
    title: String,
    location: String,
    analytics: Number,
    description: String,
    categoryid: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});

export const Track = Mongoose.model("Track", trackSchema);
