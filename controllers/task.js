import { Task } from "../models/task.js";

export const getAllTasks = async (req, res) => {
  const userId = req.user._id;

  const tasks = await Task.find({ user: userId });

  res.json({
    success: true,
    tasks,
  });
};

export const newTask = async (req, res) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "task added successfully",
  });
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "invalid id",
    });
  }

  task.completed = !task.completed;

  await task.save();

  res.status(200).json({
    success: true,
    message: "task updated successfully",
  });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "invalid id",
    });
  }

  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "task deleted successfully",
  });
};
