import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [err, setErr] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, sets, reps, type, weight };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setErr(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setWeight("");
      setReps("");
      setSets("");
      setType("");
      setErr(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="flex flex-col gap-2 mt-10">
      <h1 className="text-3xl font-bold mb-5">Add a new workout</h1>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        className="input"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="weight">Weight(kg)</label>
      <input
        type="text"
        name="weight"
        className="input"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        name="type"
        className="input"
        onChange={(e) => setType(e.target.value)}
        value={type}
      />

      <label htmlFor="sets">Sets</label>
      <input
        type="text"
        name="sets"
        className="input"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
      />

      <label htmlFor="reps">Reps</label>
      <input
        type="text"
        name="reps"
        className="input"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button className="btn btn-green" onClick={handleSubmit}>
        Submit
      </button>
      {err && <div className="error">{err}</div>}
    </form>
  );
};

export default WorkoutForm;
