import { Router } from "express";

import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";

import { createBrand, deleteBrand, getBrandDetails, updateBrand } from "../controllers/brand.controller.js";

const router = Router()

router.route("/createBrand").post(verifyJWT,
     verifyRole("admin"),
    createBrand
)

router.route("/getBrandDetails").get(
    getBrandDetails
)

router.route("/updateBrand/:id").put(verifyJWT,
     verifyRole("admin"),
     updateBrand)
router.route("/deleteBrand/:id").delete(verifyJWT,
     verifyRole("admin"),
      deleteBrand)



export default router