import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const placemarks = category.placemarks;
      let markers = "";
      for (let i = 0; i < placemarks.length; i++) {
        markers += "L.marker(["+(placemarks[i].latitude||"").toString()+", "+(placemarks[i].longitude|"").toString()+"]).addTo(map);\r\n";
      }
      let mapview = null;
      if (placemarks.length > 0) {
        mapview = ".setView(["+(placemarks[0].latitude||"").toString()+", "+(placemarks[0].longitude||"").toString()+"], 6.4)";
      }

      const viewData = {
        title: "Category",
        category: category,
        markers: markers,
        mapview: mapview,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
       // const currentCategory = await db.categoryStore.getCategoryById(request.params.id);
        return h.view("category-view", { title: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);

      const newPlacemark = {
        title: request.payload.title,
        location: request.payload.location,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        analytics: Number(request.payload.analytics),
        description: request.payload.description,

       };

    //  console.log ("step1");
      const file = request.payload.image;
      if (Object.keys(file).length > 0) {
        const url = await imageStore.uploadImage(request.payload.image);
      //  console.log ("url");
     //   console.log (url);
        newPlacemark.image = url;
      };
    //  console.log (newPlacemark);
      await db.placemarkStore.addPlacemark(category._id, newPlacemark);
      return h.redirect(`/category/${category._id}`);
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  deletePlacemark: {
    handler: async function(request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/category/${category._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          category.img = url;
          await db.categoryStore.updateCategory(category);
        }
        return h.redirect(`/category/${category._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${category._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
