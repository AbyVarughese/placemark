import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

export const placemarkJsonStore = {
    async getAllPlacemark() {
        await db.read();
        return db.data.placemarks;
    },

    async addPlacemark(categoryId, placemark) {
        await db.read();
        placemark._id = v4();
        placemark.category = categoryId;
        db.data.placemarks.push(placemark);
        await db.write();
        return placemark;
    },

    async getPlacemarksByCategoryId(id) {
        await db.read();
        return db.data.placemarks.filter((placemark) => placemark.category === id);
    },

    async getPlacemarkById(id) {
        await db.read();
        return db.data.placemarks.find((placemark) => placemark._id === id);
    },

    async deletePlacemark(id) {
        await db.read();
        const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
        db.data.placemarks.splice(index, 1);
        await db.write();
    },

    async deleteAllPlacemarks() {
        db.data.placemarks = [];
        await db.write();
    },

    async updatePlacemark(placemark, updatedPlacemark) {
        placemark.name = updatedPlacemark.name;
        placemark.location = updatedPlacemark.location;
        placemark.analytics = updatedPlacemark.analytics;
        placemark.description = updatedPlacemark.description;
        await db.write();
    },
};