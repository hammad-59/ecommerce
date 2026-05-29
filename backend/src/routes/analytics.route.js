import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { orderAnalytics, topSellingProductsAnalytics, totalRevenueAnalytics } from "../controllers/analytics.controller.js";

const router = Router()

router.route("/totalRevenueAnalytics").get(verifyJWT,verifyRole("admin"),  totalRevenueAnalytics)
router.route("/orderAnalytics").get(verifyJWT, verifyRole("admin"), orderAnalytics)
router.route("/topSellingProducts").get(verifyJWT, verifyRole("admin"), topSellingProductsAnalytics)



export default router