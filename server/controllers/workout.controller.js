import Workout from "../models/workout.model.js";
import mongoose from "mongoose";

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, sets, reps, weight, type } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!type) {
    emptyFields.push("type");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Fill in all the fields" }, emptyFields);
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      sets,
      reps,
      weight,
      type,
      user_id,
    });
    return res.status(201).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

export default {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
