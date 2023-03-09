import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark._id = v4();
    placemark.categoryid = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    return placemarks.filter((placemark) => placemarkcategoryid === id);
  },

  async getPlacemarkById(id) {
    let placemark = placemarks.find((placemark) => placemark._id === id);
    if (placemark == undefined) {
      placemark = null;
    }
    return placemark;
  },

  async getCategoryPlacemarks(categoryId) {
    return placemarks.filter((placemark) => placemark.categoryid === categoryId);
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.location = updatedPlacemark.location;
    placemark.analytics = updatedPlacemark.analytics;
    placemark.description = updatedPlacemark.description;
  },
};
