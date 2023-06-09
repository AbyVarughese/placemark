import { Placemark } from "./placemark.js";
import {v4} from "uuid";
import {Category} from "./category.js";

export const placemarkMongoStore = {
    async getAllPlacemarks() {
        const placemarks = await Placemark.find().lean();
        return placemarks;
    },
    async getPublicPlacemarks() {
        const placemarks = await Placemark.find({pub: true}).lean();
        return placemarks;
    },
    async addPlacemark(categoryId, placemark) {
        placemark.categoryid = categoryId;
        const newPlacemark = new Placemark(placemark);
        const placemarkObj = await newPlacemark.save();
        return this.getPlacemarkById(placemarkObj._id);
    },

    async getPlacemarksByCategoryId(id) {
        const placemarks = await Placemark.find({ categoryid: id }).lean();
        return placemarks;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean();
            return placemark;
        }
        return null;
    },

    async deletePlacemark(id) {
        try {
            await Placemark.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    },

    /*
    async updatePlacemark(placemark, updatedPlacemark) {
        placemark.title = updatedPlacemark.title;
        placemark.location = updatedPlacemark.location;
        placemark.analytics = updatedPlacemark.analytics;
        placemark.description = updatedPlacemark.description;
        console.log(placemark);
        const upd = new Placemark(placemark);
       // console.log(upd);
        await upd.save();
    },
     */
    //  if(image) { new.image = image }

    async updatePlacemark(placemark, updatedPlacemark) {
        const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
        placemarkDoc.title = updatedPlacemark.title;
        placemarkDoc.location = updatedPlacemark.location;
        placemarkDoc.latitude = updatedPlacemark.latitude;
        placemarkDoc.longitude = updatedPlacemark.longitude;
        placemarkDoc.analytics = updatedPlacemark.analytics;
        placemarkDoc.description = updatedPlacemark.description;
        if(updatedPlacemark.image)  {placemarkDoc.image = updatedPlacemark.image;}
        placemarkDoc.pub = updatedPlacemark.pub;
        await placemarkDoc.save();
    },
};


