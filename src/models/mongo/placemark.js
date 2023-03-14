import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    title: String,
    location: String,
    latitude: Number,
    longitude: Number,
    analytics: Number,
    description: String,
    categoryid: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    image: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
