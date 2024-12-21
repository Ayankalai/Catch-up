import { Router } from "express";
import { verifyJWT } from "../middleweres/auth.middleware.js";
import { getUser, searchAllUser,} from "../controllers/search.controller.js";


const router = Router()

router.route("/searchallusers").get(verifyJWT,searchAllUser)
router.route("/getUser/:otherUserId").get(verifyJWT,getUser)

export default router