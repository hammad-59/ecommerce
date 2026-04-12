import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { createProduct, deleteSingleProduct, editProductImage, editSingleProduct, getProductMeta, getProducts, getSingleProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/createProduct").post(verifyJWT, 
  verifyRole("admin"),
   upload.fields([{ name: "images", maxCount: 3 }]),
   createProduct
)

router.route("/getProducts").get(getProducts)

router.route("/getProductMeta").get(getProductMeta)

router.route("/getSingleProduct/:id").get(
    getSingleProduct)

router.route("/editSingleProduct/:id").put(verifyJWT,
   verifyRole("admin"), 
   editSingleProduct)

router.route("/editProductImage/:id").put(verifyJWT,
   verifyRole("admin"), 
upload.array("image"),
  editProductImage)

router.route("/deleteSingleProduct/:id").delete(verifyJWT,
   verifyRole("admin"), 
deleteSingleProduct)  

export default router