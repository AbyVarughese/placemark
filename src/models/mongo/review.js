import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    message: String,
    rating: Number,
    reviewDate: Date,
    placemarkid: {
        type: Schema.Types.ObjectId,
        ref: "Placemark",
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
  },
});

export const Review = Mongoose.model("Review", reviewSchema);
