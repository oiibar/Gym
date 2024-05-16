import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { WorkoutsContextProvider } from "./context/workout.context.jsx";

function App() {
  return (
    <WorkoutsContextProvider>
      <RouterProvider router={router} />
    </WorkoutsContextProvider>
  );
}

export default App;
