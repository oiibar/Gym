import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10">Login</h1>
      <form
        className="flex w-1/3 flex-col mx-auto gap-5"
        onSubmit={handleSubmit}
      >
        <h3>Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          className="input"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="input"
          placeholder="Password"
        />
        <button disabled={isLoading} className="btn btn-green mx-auto">
          Submit
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
