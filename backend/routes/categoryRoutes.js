import express from "express";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
import { authenticate, autorizedAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(authenticate, autorizedAdmin, createCategory);
router.route("/:categoryId").put(authenticate, autorizedAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, autorizedAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
