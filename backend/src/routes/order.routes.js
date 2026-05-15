import { Router } from "express";

import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { adminViewOrders, changingStatus, codCheckout, confirmPayment, stripeCheckout, userTrackingOrder } from "../controllers/order.controller.js";

const router = Router()

router.route("/codCheckout").post(verifyJWT, codCheckout)

router.route("/stripeCheckout").post(verifyJWT, stripeCheckout)
router.route("/confirmPayment").post(verifyJWT, confirmPayment)
router.route("/adminViewOrders").get(verifyJWT,verifyRole("admin"),  adminViewOrders)
router.route("/changingStatus/:id").put(verifyJWT, verifyRole("admin"), changingStatus)
router.route("/userTrackingOrder").get(verifyJWT, userTrackingOrder)




export default router