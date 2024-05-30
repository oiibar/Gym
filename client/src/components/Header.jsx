import { FaDumbbell } from "react-icons/fa6";
import { Link } from "react-router-dom";
//import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const Header = () => {
  //const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    //logout();
  };

  return (
    <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm justify-between">
      <Link to="/">
        <FaDumbbell size={20} />
      </Link>
      <nav>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        {!user && (
          <div className="flex gap-6">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
