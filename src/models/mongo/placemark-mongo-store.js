import { Placemark } from "./placemark.js";
import {v4} from "uuid";
import {Category} from "./category.js";

export const placemarkMongoStore = {
    async getPlacemarksByCategoryId(id) {
        const placemarks = await Placemark.find({ categoryid: id }).lean();
        return placemarks;
    },
    async addPlacemark(categoryId, placemark) {
        placemark.categoryid = categoryId;
        const newPlacemark = new Placemark(placemark);
        const placemarkObj = await newPlacemark.save();
    },

    async deletePlacemark(id) {
        try {
            await Placemark.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },
};


