import { Router } from "express"
import { addToCart, cartQuantity, getCart, removeCart } from "../controllers/cart.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/addcart").put(verifyJWT, addToCart)
router.route("/getCart").get(verifyJWT, getCart)
router.route("/cartQuantity").put(verifyJWT, cartQuantity)
router.route("/removeCart").delete(verifyJWT, removeCart)


export default router