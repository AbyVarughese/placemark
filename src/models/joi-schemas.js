import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
    .keys({
        title: Joi.string().required().example("suir"),
        location: Joi.string().required().example("Waterford"),
        latitude: Joi.number().allow("").optional().example(53.45367),
        longitude: Joi.number().allow("").optional().example(-4.3245),
        analytics: Joi.number().allow("").optional().example(12),
        description: Joi.string().required().example("Good place"),
        pub: Joi.boolean(),
        categoryid: IdSpec,
        image: Joi.any().allow("", null).optional().example("https://server.com/image.jpg"),
    })
    .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const CategorySpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Rivers"),
        userid: IdSpec,
        placemarks: PlacemarkArraySpec,
    })
    .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const ReviewSpec = Joi.object()
    .keys({
        message: Joi.string().required(),
        rating: Joi.number().required(),
        userid: IdSpec,
        placemarkid: IdSpec,
    })
    .label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");