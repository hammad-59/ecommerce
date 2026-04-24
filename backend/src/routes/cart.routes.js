import { Router } from "express"
import { addToCart, getCart } from "../controllers/cart.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/addcart").put(verifyJWT, addToCart)
router.route("/getCart").get(verifyJWT, getCart)


export default router