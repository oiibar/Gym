import React from "react";
import { formatDate } from "./../helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext"; // Ensure to import this

const Workout = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext(); // Use useAuthContext to get the user

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `https://gym-serv.onrender.com/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
    } else {
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
