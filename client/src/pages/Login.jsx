import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-1/3 flex-col mx-auto gap-5"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="input"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          placeholder="Password"
        />
        <button
          disabled={isLoading}
          onClick={Navigate("/")}
          className="btn btn-green mx-auto"
        >
          Submit
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
