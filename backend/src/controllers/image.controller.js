import mongoose from "mongoose";
import { Image } from "../models/image.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandaler.js";
import uploadCloudinary from "../utils/cloudinary.js";



const uploadImage = asynchandler(async (req, res) => {
    const { caption } = req.body;
    const image = req.file.path;

    if (!image) {
        throw new apiError(401, "Image required");
    }

    const uploadedImage = await uploadCloudinary(image);

    if (!uploadedImage) {
        throw new apiError(505, "Error while uploading the image to Cloudinary");
    }

    console.log(uploadedImage.url);

    
    const userImageData = await Image.create({
        caption,
        image: uploadedImage.url,
        imageOwner: req.user._id
    });

    if (!userImageData) {
        throw new apiError(500,"Error while storing the data in the data base")
    }
    console.log(userImageData);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Image uploaded successfully",
            userImageData
        )
    );
});

const getUserImage = asynchandler(async (req,res) => {
    console.log(req.user._id)

    const userImage = await Image.find({imageOwner:req.user._id})
    console.log(userImage)
    
    if (!userImage) {
        throw new apiError(404, "Image not found for this user");
    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            userImage,
            "user image fetch successfully"
        )
    )
})

const updateUserImage = asynchandler(async (req,res) => {
    // const { imageId } = req.params
    const image = req.file.path;
    const { caption } = req.body

    const uplodedImageinCloudinary = await uploadCloudinary(image)

    if (!uplodedImageinCloudinary) {
        throw new apiError(500,"error while uploding image in cloudinary")
    }
    console.log(uplodedImageinCloudinary)

    const updatedImage = await Image.findByIdAndUpdate( new mongoose.Types.ObjectId(req.params),
        {
            $set: {
                image:uplodedImageinCloudinary.url,
                caption
            }
        },
        {
            new: true
        }
    )
    if (!updatedImage) {
        throw new apiError(500,"error while uploding image in cloudinary")
    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            updatedImage,
            "Image data updated successfully"
        )
    )
})

const deleteUserImage = asynchandler(async (req,res) => {
    const { imageId } = req.params


    const  deleteImage = await Image.deleteOne(new mongoose.Types.ObjectId(req.params))

    console.log(deleteImage)


    if (!deleteImage) {
        throw new apiError(501,"image not found")
    }


    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "Image deleted successfully"
        )
    )
})

const UserImageId = asynchandler( async(req,res) => {
    const { userId } = req.params
    console.log(req.params)
    const userImage = await Image.findById(new mongoose.Types.ObjectId(req.params))
    if (!userImage) {
        throw new apiError(404,"user image not found")
    }
    console.log(userImage)

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            userImage,
            "User image fetch successfully"
        )
    )
})

export{
    uploadImage,
    getUserImage,
    updateUserImage,
    deleteUserImage,
    UserImageId
}