const asyncHandler = require("../utils/asynchandler.js");
const { registerUser, loginUser } = require("../services/userService.js");
const { generateTokens } = require("../services/authService.js");
const { createRating } = require("../services/ratingService.js");
const User = require("../models/user.model.js")

const registreUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;
        const avatarPath = req.files?.avatar?.[0]?.path;
        const coverImagePath = req.files?.coverImage?.[0]?.path || "";

        if (!avatarPath) {
            return res.status(400).json({ status: false, message: 'Avatar file is required' });
        }

        const user = await registerUser({ fullName, email, username, password, avatarPath, coverImagePath });
        res.status(200).json({ status: 200, message: "User registered successfully", data: user });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ status: 500, message: "An error occurred during registration", error: error.message });
    }
});

const loginUserHandler = asyncHandler(async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Assuming loginUser is a function you import from elsewhere
        const user = await loginUser({ username, email, password });
        
        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        const accessToken = await generateTokens(user._id);

        const options = { httpOnly: true, secure: true };
        res.status(200)
           .cookie("accessToken", accessToken, options)
           .json({ status: 200, message: "User logged in successfully", user, accessToken });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ status: 500, message: "An error occurred during login", error: error.message });
    }
});


const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({ status: 200, message: "User fetched successfully", data: req.user });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


const getUserLogout = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { accessToken: "" });
        res.status(200)
           .clearCookie("accessToken", { httpOnly: true, secure: true })
           .json({ status: 200, message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ status: 500, message: "An error occurred during logout", error: error.message });
    }
});

const GetRatingFromUser = asyncHandler(async (req, res) => {
    try {
        const ratingData = await createRating(req.user._id, req.body);
        res.status(200).json({ status: 200, message: "Rating saved successfully", data: ratingData });
    } catch (error) {
        console.error("Rating Error:", error);
        res.status(500).json({ status: 500, message: "An error occurred while saving the rating", error: error.message });
    }
});


module.exports = { registreUser, loginUserHandler, getCurrentUser, getUserLogout, GetRatingFromUser };
