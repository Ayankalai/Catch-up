import { Router } from "express";
import { verifyJWT } from "../middleweres/auth.middleware.js";
import { upload } from "../middleweres/multer.js";
import { deleteUserImage, getUserImage, updateUserImage, uploadImage, UserImageId } from "../controllers/image.controller.js";

const router = Router()

router.route("/uploadImage").post(verifyJWT,upload.single("image"),uploadImage)
router.route("/getUserImage").get(verifyJWT,getUserImage)
router.route("/updateUserImage/:id").patch(verifyJWT,upload.single("image"),updateUserImage)
router.route("/deleteUserImage/:id").delete(verifyJWT,deleteUserImage)
router.route("/userImageId/:id").get(verifyJWT,UserImageId)

export default router