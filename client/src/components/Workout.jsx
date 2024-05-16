import React from "react";
import { formatDate } from "./../helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Workout = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };

  return (
    <div className="workout">
      <h4 className="text-green-400 font-bold text-lg">{workout.title}</h4>
      <p>
        <strong>Load: </strong>
        {workout.weight} kg
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.sets} x {workout.reps}
      </p>
      <p>{workout.type}</p>
      <p>{formatDate(workout.createdAt)}</p>
      <button
        onClick={handleDelete}
        className="btn btn-red hover:btn-red flex text-center items-center justify-center"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default Workout;
