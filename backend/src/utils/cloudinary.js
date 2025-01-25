const cloudinary = require('cloudinary').v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log(localFilePath, "----localFilePath")
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath)
        return null;
    }
}

module.exports = uploadOnCloudinary
