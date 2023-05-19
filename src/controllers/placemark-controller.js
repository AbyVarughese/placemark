import { PlacemarkSpec, ReviewSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
    index: {
        handler: async function (request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
            const viewData = {
                title: "Edit Placemark",
                category: category,
                placemark: placemark,
            };
            return h.view("placemark-view", viewData);
        },
    },
    public: {
        auth: false,
        handler: async function (request, h) {
            const placemarks = await db.placemarkStore.getPublicPlacemarks();
            const viewData = {
                placemarks: placemarks,
            };
            return h.view("public-view", viewData);
        },
    },

    review: {
        auth: { mode: "optional" },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
            const reviews = await db.reviewStore.getReviewsByPlacemarkId(request.params.placemarkid)
            const viewData = {
                placemark: placemark,
                reviews: [],
            };
            return h.view("placemark-review", viewData);
        },
    },
    addReview: {
        validate: {
            payload: ReviewSpec,
            options: {abortEarly: false},
            failAction: async function (request, h, error) {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
                const viewData = {
                    placemark: placemark,
                    loggedInUser: loggedInUser,
                    reviews: [],
                    messageText: request.payload.message,
                    errors: error.details,
                };
                return h.view("placemark-review", viewData).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newReview = {
                placemarkid: request.params.placemarkid,
                userid: loggedInUser._id,
                message: request.payload.message,
                rating: request.payload.rating,
                reviewDate: new Date(),
            };
            await db.reviewStore.addReview(newReview);
            return h.redirect(`/public/review/${request.params.placemarkid}`);
        },
    },
    update: {
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("placemark-view", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
           // console.log("good id");
           // console.log(placemark);
            const newPlacemark = {
                title: request.payload.title,
                location: request.payload.location,
                latitude: request.payload.latitude,
                longitude: request.payload.longitude,
                analytics: Number(request.payload.analytics),
                description: request.payload.description,
                pub: request.payload.pub,
            };

            const file = request.payload.image;
            if (Object.keys(file).length > 0) {
                const url = await imageStore.uploadImage(request.payload.image);
                newPlacemark.image = url;
            };

            await db.placemarkStore.updatePlacemark(placemark, newPlacemark);
            return h.redirect(`/category/${request.params.id}`);
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
};
