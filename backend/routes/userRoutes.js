import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, autorizedAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, autorizedAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateUserProfile);

// as an admin
router
  .route("/:id")
  .delete(authenticate, autorizedAdmin, deleteUserById)
  .get(authenticate, autorizedAdmin, getUserById)
  .put(authenticate, autorizedAdmin, updateUserById);

export default router;
