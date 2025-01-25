const User = require("../models/user.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

const registerUser = async ({ fullName, email, username, password, avatarPath, coverImagePath }) => {
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) throw new Error("User with email or username already exists");

    const avatar = await uploadOnCloudinary(avatarPath);
    const coverImage = coverImagePath ? await uploadOnCloudinary(coverImagePath) : null;

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });
    user.password = undefined; // remove password from the response

    return user;
};

const loginUser = async ({ username, email, password }) => {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) throw new Error("User does not exist");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new Error("Invalid user credentials");

    return user;
};

module.exports = { registerUser, loginUser };
