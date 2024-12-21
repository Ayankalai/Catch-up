import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandaler.js";



const searchAllUser = asynchandler( async (req,res) => {
    const { query } = req.query;

    console.log(query)
    
    const allUser = await User.find({
        username: { $regex: query, $options: 'i' } 
    });
    if (allUser.length === 0) {
        // throw new apiError(403,"user not match")
        return res.status(404)
        .json(
            new ApiResponse(
                404,
                "user not found"
            )
        )
    }
    console.log(allUser)

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            allUser,
            "Search user fetch successfully"
    )
    )
})

const getUser = asynchandler( async (req,res) => {
    console.log("==========")
    const { otherUserId } = req.params;
    console.log(otherUserId)
    if (!otherUserId) {
        throw new apiError("User id not found")
    }

    
    
    const user = await User.findById(otherUserId);
    if (!user) {
        throw new apiError(404,"user not found")
    }
    console.log(user)

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Search user fetch successfully"
    )
    )
})

export {
    searchAllUser,
    getUser
}