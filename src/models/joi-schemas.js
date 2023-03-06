import Joi from "joi";

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const UserSpec = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const TrackSpec = {
    title: Joi.string().required(),
    location: Joi.string().required(),
    analytics: Joi.number().allow("").optional(),
    description: Joi.string().required(),
};

export const CategorySpec = {
    title: Joi.string().required(),
};
