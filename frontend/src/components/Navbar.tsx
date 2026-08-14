import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const homeTarget = user ? "/dashboard" : "/";

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 border-b bg-white border-black w-full h-12 flex items-center px-4"
    >
      <Link
        to={homeTarget}
        aria-label="Go to home"
        className="text-black font-semibold text-2xl hover:cursor-pointer"
      >
        Dear<span className="text-[#a4544b]">Us</span>
      </Link>
      <span
        className="ml-auto text-sm font-medium text-[#4b2723] hover:cursor-pointer"
        onClick={logout}
      >
        Logout
      </span>
    </nav>
  );
};
