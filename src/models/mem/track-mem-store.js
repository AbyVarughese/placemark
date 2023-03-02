import { v4 } from "uuid";

let tracks = [];

export const trackMemStore = {
  async getAllTracks() {
    return tracks;
  },

  async addTrack(categoryId, track) {
    track._id = v4();
    track.categoryid = categoryId;
    tracks.push(track);
    return track;
  },

  async getTracksByCategoryId(id) {
    return tracks.filter((track) => track.categoryid === id);
  },

  async getTrackById(id) {
    return tracks.find((track) => track._id === id);
  },

  async getCategoryTracks(categoryId) {
    return tracks.filter((track) => track.categoryid === categoryId);
  },

  async deleteTrack(id) {
    const index = tracks.findIndex((track) => track._id === id);
    tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
  },
};
