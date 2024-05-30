import { useEffect } from "react";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "./../hooks/useWorkoutsContext";
import { useAuthContext } from "./../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://gym-serv.onrender.com/api/workouts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col gap-20 items-center justify-center text-center">
      <WorkoutForm />
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default Home;
