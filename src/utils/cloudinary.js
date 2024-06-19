import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        //  find is not available in local
        if(!localFilePath) {
            console.error("Couldn't find local file");
            return null;
        };

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log("RESPONSE ON CLOUDINARY STATUS: ", response);

        // file has been uploaded successfully
        console.log("File is uploaded on cloudinary", response.url);
        return response.url;
    } catch (error) {
        // remove the locally saved temporary file as the upload oreration got failed
        fs.unlinkSync(localFilePath); 
        return null; 
    }
}

export { uploadOnCloudinary }