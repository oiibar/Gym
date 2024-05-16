import express from "express";
import controllers from "../controllers/workout.controller.js";
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } =
  controllers;

const router = express.Router();

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

export default router;
