import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    registerUser
)

router.route("/login").post(loginUser)

// Secured Routes

router.route("/editProfile").put(verifyJWT, updateAccountDetails)
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/changePassword").put(verifyJWT, changeCurrentPassword)

router.route("/refresh-token").post(refreshAccessToken)


export default router