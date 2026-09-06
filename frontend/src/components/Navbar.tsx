import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, Sparkles, ListTodo, X, BookHeart, LogOut } from "lucide-react";
import heartIcon from "../assets/icons/drawn-heart-icon.png";
import { useState } from "react";
import { isDemoMode } from "../services/demoMode";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const demo = isDemoMode();
  const homeTarget = demo ? "/demo" : user ? "/dashboard" : "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-0 top-0 z-50 flex w-full flex-col bg-[#FFEDEA] p-3 shadow-sm md:h-full md:w-70 md:gap-10 md:p-4"
    >
      <div className="flex items-center justify-between text-start md:block">
        <div className="flex flex-col">
          <span
            className="text-2xl font-semibold text-[#a4544b]"
            style={{ fontFamily: "Literata" }}
          >
            DearUs
          </span>
          <span className="text-xs font-medium text-[#331200]">
            Our safe harbor
          </span>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <span className="max-w-32 truncate text-xs font-medium text-[#331200]">
            {user?.name}
          </span>
          <button
            type="button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="rounded p-2 text-[#331200]"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <span className="mt-3 hidden items-center gap-1 text-xs font-medium text-[#331200] md:mt-10 md:flex md:justify-start">
          <img
            src={heartIcon}
            alt="heart"
            className="mr-2 inline-block h-4 w-4"
          />
          {user?.name}
        </span>
      </div>

      <div
        className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-2 border-b border-black bg-[#FFEDEA] p-3 md:static md:flex md:h-full md:w-auto md:border-0 md:bg-transparent md:p-0`}
      >
        <NavLink
          to={homeTarget}
          end
          aria-label="Go to home"
          onClick={closeMenu}
          className={({ isActive }) =>
            `flex w-full flex-row items-center justify-start gap-5 rounded p-2 text-sm font-medium text-[#331200] transition-all duration-300 hover:cursor-pointer ${
              isActive
                ? "bg-[#A4544B] text-white"
                : "hover:bg-[#A4544B] hover:text-white"
            }`
          }
        >
          <Sparkles size={16} />
          Home
        </NavLink>
        {user?.couple_id && (
          <NavLink
            to={demo ? "/demo/manage-couple" : "/manage-couple"}
            aria-label="Go to Manage Couple"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex w-full flex-row items-center justify-start gap-5 rounded p-2 text-sm font-medium text-[#331200] transition-all duration-200 hover:cursor-pointer ${
                isActive
                  ? "bg-[#A4544B] text-white"
                  : "hover:bg-[#A4544B] hover:text-white"
              }`
            }
          >
            <BookHeart size={16} />
            Couple Details
          </NavLink>
        )}

        {user?.couple_id && (
          <NavLink
            to={demo ? "/demo/experiences" : "/experiences"}
            aria-label="Go to experiences"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex w-full flex-row items-center justify-start gap-5 rounded p-2 text-sm font-medium text-[#331200] transition-all duration-200 hover:cursor-pointer ${
                isActive
                  ? "bg-[#A4544B] text-white"
                  : "hover:bg-[#A4544B] hover:text-white"
              }`
            }
          >
            <ListTodo size={16} />
            Experiences
          </NavLink>
        )}
        <button
          type="button"
          className="flex flex-row items-center gap-5 rounded p-2 text-left text-sm text-[#331200] transition-all duration-300 hover:cursor-pointer hover:bg-[#A4544B] hover:text-white md:mt-auto"
          onClick={() => {
            closeMenu();
            if (demo) {
              navigate("/");
            } else {
              logout();
              navigate("/");
            }
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};
