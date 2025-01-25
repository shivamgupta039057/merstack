const imageService = require("../services/imageService");

const imagescollectionData = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title field is required" });
        }

        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const imageData = await imageService.uploadImage(avatarLocalPath, title);
        return res.status(200).json({
            status: 200,
            message: "Images Uploaded Successfully",
            data: imageData,
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: [],
        });
    }
};

const getAllImages = async (_, res) => {
    try {
        const images = await imageService.getAllImages();
        return res.status(200).json({
            status: 200,
            message: "Images retrieved successfully",
            data: images,
        });
    } catch (error) {
        console.error("Error retrieving images:", error);
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: [],
        });
    }
};

const getUpdateImages = async (req, res) => {
    try {
        const { id } = req.params;
        const imageReplacePath = req.file?.path;

        if (!id || !imageReplacePath) {
            return res.status(400).json({ message: "_id and image file are required" });
        }

        const updatedImage = await imageService.updateImage(id, imageReplacePath);
        if (!updatedImage) {
            return res.status(404).json({ message: "Image not found" });
        }

        return res.status(200).json({
            status: 200,
            message: "Image replaced successfully",
            data: updatedImage,
        });
    } catch (error) {
        console.error("Error updating image:", error);
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: [],
        });
    }
};

const deleteImages = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "_id is required" });
        }

        const deletedImage = await imageService.deleteImage(id);
        if (!deletedImage) {
            return res.status(404).json({ message: "Image not found" });
        }

        return res.status(200).json({
            status: 200,
            message: "Image deleted successfully",
            data: deletedImage,
        });
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: [],
        });
    }
};

module.exports = { imagescollectionData, getAllImages, getUpdateImages, deleteImages };
