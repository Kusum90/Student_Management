// const cloudinary = require ("cloudinary").v2

// cloudinary.config({
//     cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
//     api_key: process.env.CLOUDNARY_API_KEY,
//     api_secret: process.env.CLOUDNARY_API_SECRET
// });

// const uploadfile = async (filePath) => {
//     try {
//         const result = await cloudinary.uploader.upload(filePath);
//         console.log(result);
//         return result;
//         } catch (error) {
//             console.log("Error uploading file to Cloudinary:",error);
//             throw error;
// }
// }

// module.exports = {
//     uploadfile
// }