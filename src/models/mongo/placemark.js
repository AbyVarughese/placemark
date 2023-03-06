import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    title: String,
    location: String,
    analytics: Number,
    description: String,
    categoryid: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
