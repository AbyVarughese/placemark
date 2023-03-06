import { Track } from "./track.js";
import {v4} from "uuid";
import {Category} from "./category.js";

export const trackMongoStore = {
    async getTracksByCategoryId(id) {
        const tracks = await Track.find({ categoryid: id }).lean();
        return tracks;
    },
    async addTrack(categoryId, track) {
        track.categoryid = categoryId;
        const newTrack = new Track(track);
        const trackObj = await newTrack.save();
    },

    async deleteTrack(id) {
        try {
            await Track.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },
};


