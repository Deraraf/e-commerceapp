import express from "express";
import formidable from "express-formidable";

import { authenticate, autorizedAdmin } from "../middlewares/authMiddleware.js";
import { checkId } from "../middlewares/checkId.js";
import {
  addProduct,
  updateProductDetails,
  removeproduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";
const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, autorizedAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, autorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticate, autorizedAdmin, removeproduct);

router.route("/filtered-products").post(filterProducts);

export default router;
