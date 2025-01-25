const uploadOnCloudinary = require("../utils/cloudinary");
const Image = require("../models/Images.model");

const uploadImage = async (path, title) => {
    const avatar = await uploadOnCloudinary(path);
    return await Image.create({
        title,
        images: avatar.url,
    });
};

const getAllImages = async () => {
    return await Image.find();
};

const updateImage = async (id, imagePath) => {
    const newImageUrl = await uploadOnCloudinary(imagePath);
    const image = await Image.findById(id);
    if (image) {
        image.images = newImageUrl.url;
        await image.save();
    }
    return image;
};

const deleteImage = async (id) => {
    return await Image.findByIdAndDelete(id);
};

module.exports = { uploadImage, getAllImages, updateImage, deleteImage };
