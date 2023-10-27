import express from "express";
import {
  deleteTask,
  getAllTasks,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", isAuthenticated, getAllTasks);
router.post("/new", isAuthenticated, newTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
