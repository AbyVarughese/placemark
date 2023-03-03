import { TrackSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addTrack: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentCategory = await db.categoryStore.getCategoryById(request.params.id);
        return h.view("category-view", { title: "Add place error", category:currentCategory, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newTrack = {
        title: request.payload.title,
        location: request.payload.location,
        analytics: Number(request.payload.analytics),
        description: request.payload.description,
      };
      await db.trackStore.addTrack(category._id, newTrack);
      return h.redirect(`/category/${category._id}`);
    },
  },
  deleteTrack: {
    handler: async function(request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.trackStore.deleteTrack(request.params.trackid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
