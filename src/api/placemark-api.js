import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlacemarkSpec, CategorySpec } from "../models/joi-schemas.js";

export const placemarkApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
        },
    },

    findOne: {
        auth: false,
        async handler(request) {
        },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
        },
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
        },
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
        },
    },
};
