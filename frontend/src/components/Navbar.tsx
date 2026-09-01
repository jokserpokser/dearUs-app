import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles, ListTodo } from "lucide-react";
import heartIcon from "../assets/icons/drawn-heart-icon.png";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const homeTarget = user ? "/dashboard" : "/";

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 z-50 border-b bg-[#FFDAD5] border-black h-full flex flex-col p-4 w-70 gap-10"
    >
      <div className="flex flex-col text-start">
        <span
          className="text-[#a4544b] font-semibold text-2xl"
          style={{ fontFamily: "Literata" }}
        >
          DearUs
        </span>
        <span className="text-[#331200] font-medium text-xs">
          Our safe harbor
        </span>
        <span className="flex text-[#331200] font-medium text-xs mt-10 justify-start items-center gap-1">
          <img
            src={heartIcon}
            alt="heart"
            className="w-4 h-4 inline-block mr-2"
          />
          {user?.name}
        </span>
      </div>

      <div className="flex flex-col gap-2 items-start h-full">
        <Link
          to={homeTarget}
          aria-label="Go to home"
          className="flex flex-row text-[#331200] w-full font-medium text-sm hover:cursor-pointer gap-5 items-center justify-start hover:bg-[#A4544B] hover:text-white transition-all duration-300 p-2 rounded"
        >
          <Sparkles size={16} />
          Home
        </Link>

        <Link
          to={homeTarget}
          aria-label="Go to home"
          className="flex flex-row text-[#331200] w-full font-medium text-sm hover:cursor-pointer gap-5 items-center justify-start hover:bg-[#A4544B] hover:text-white transition-all duration-200 p-2 rounded"
        >
          <ListTodo size={16} />
          Bucket List
        </Link>
      </div>
      <span
        className="text-sm text-[#331200] hover:cursor-pointer hover:bg-[#A4544B] hover:text-white transition-all duration-300 p-2 rounded"
        onClick={logout}
      >
        Logout
      </span>
    </nav>
  );
};
