const express = require("express");
const {
    registreUser,
    loginUserHandler,
    getCurrentUser,
    getUserLogout,
    getUserChangePasswords,
    GetRatingFromUser
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");
const verifyJWT = require('../middlewares/auth.middleware');

const router = express.Router();

// Registration route with file upload
router.post(
    "/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registreUser
);

// Login route
router.post("/login", loginUserHandler);

// Get current user details (protected route)
router.get("/getUserAllDetatils", verifyJWT, getCurrentUser);

// Logout route (protected route)
router.get("/logout", verifyJWT, getUserLogout);

// Change password route (protected route)
// router.post("/change-password", verifyJWT, getUserChangePasswords);

// Rating route (protected route)
router.post("/rating", verifyJWT, GetRatingFromUser);

module.exports = router;
