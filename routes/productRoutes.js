import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSpecificProduct,
  productFilterController,
  productImageController,
  updateProductController,
} from "../controllers/productController.js";

import { isAdmin, loginTokenCheck } from "./../middlewares/authMiddleWare.js";

//Creating product router
const router = express.Router();

//create product route
router.post(
  "/create-product",
  loginTokenCheck,
  isAdmin,
  formidable(),
  createProductController
);

//update product route
router.put(
  "/update-product/:id",
  loginTokenCheck,
  isAdmin,
  updateProductController
);

//get all products
router.get("/products", getAllProductsController);

// get specific product
router.get("/specific-product/:slug", getSpecificProduct);

//delete product route
router.delete(
  "/delete-product/:id",
  loginTokenCheck,
  isAdmin,
  deleteProductController
);

//get image
router.get("/product-image/:pid", productImageController);
//filtered product
router.post("/product-filters", productFilterController);

export default router;
