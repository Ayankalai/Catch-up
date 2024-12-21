import mongoose from "mongoose"

const imageSchema = new mongoose.Schema(
    {
        image:{
            type:String
        },
        imageOwner:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        caption:{
            type:String
        }
    },
    {
        timestamps: true
    }
)

export const Image = mongoose.model("Image",imageSchema) 