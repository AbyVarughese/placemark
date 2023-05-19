import { Review } from "./review.js";

export const reviewMongoStore = {
    async addReview(review) {
        const newReview = new Review(review);
        const reviewObj = await newReview.save();
        return this.getReviewById(reviewObj._id);
    },

    async getReviewsByPlacemarkId(id) {
        const reviews = await Review.find({ placemarkid: id }).lean();
        return reviews;
    },

    async getReviewById(id) {
        if (id) {
            const review = await Review.findOne({ _id: id }).lean();
            return review;
        }
        return null;
    },
};


