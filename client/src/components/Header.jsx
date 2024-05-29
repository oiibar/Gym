import { FaDumbbell } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
      <Link to="/">
        <FaDumbbell size={20} />
      </Link>
      <nav>
        <div>
          <Link to="/login"></Link>
          <Link to="/signup"></Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
