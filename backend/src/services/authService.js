const User = require("../models/user.model.js");

const generateTokens = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });
    return accessToken;
};

module.exports = { generateTokens };
