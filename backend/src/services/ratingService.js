const Rating = require("../models/productRating.js");

const createRating = async (userId, { rating, product }) => {
    const ratingData = await Rating.create({ user: userId, rating, product });
    return ratingData;
};

module.exports = { createRating };
