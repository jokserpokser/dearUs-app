import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, Sparkles, X, LogOut, House, Heart } from "lucide-react";
import { useState } from "react";
import { isDemoMode } from "../services/demoMode";

export const Navbar = () => {
  const { user, couple, logout } = useAuth();
  const navigate = useNavigate();
  const demo = isDemoMode();
  const homeTarget = demo ? "/demo" : user ? "/dashboard" : "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "DU";

  return (
    <>
      {isMenuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMenu}
        />
      )}

      <nav
        aria-label="Main navigation"
        className="fixed left-0 top-0 z-50 flex w-full flex-col bg-[#fff9f7] px-6 py-5 shadow-sm md:h-full md:w-81 md:px-7.5 md:py-7.5"
      >
        <div className="relative z-50 flex items-center justify-between bg-[#fff9f7] text-start md:block">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[1.1rem] bg-[#bf6053] text-white shadow-[0_5px_10px_rgba(137,66,56,0.2)]">
              <Heart size={24} fill="currentColor" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span
                className="text-[1.7rem] font-bold leading-none text-[#a4544b]"
                style={{ fontFamily: "Literata" }}
              >
                DearUs
              </span>
              <span className="mt-1 text-sm font-medium text-[#a27b74]">
                Our safe harbor
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex max-w-40 flex-col text-left text-xs font-medium text-[#331200] gap-2">
              <span className="truncate">{user?.name || "DearUs member"}</span>
              <span className="truncate">
                {couple?.endearment || "Your favorite person"}
                <span className="text-[#a4544b]">♥</span>
              </span>
            </div>
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
          <div className="mt-10 hidden items-center gap-4 rounded-[1.1rem] border border-[#f1e0dc] bg-white px-4 py-4 shadow-[0_2px_4px_rgba(120,70,60,0.08)] md:flex">
            <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f5ddd7] text-lg font-medium text-[#a4544b]">
              {initials}
            </div>
            <div className="flex min-w-0 flex-col text-left">
              <span className="truncate text-base font-semibold text-[#2d2020]">
                {user?.name || "DearUs member"}
              </span>
              <span className="truncate text-sm text-[#bd5e53]">
                {couple?.endearment || "Your favorite person"} ♥
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-full z-50 w-full flex-col gap-2 border-b border-[#f1e0dc] bg-[#fff9f7] p-6 md:static md:flex md:h-full md:w-auto md:border-0 md:bg-transparent md:p-0 md:pt-12`}
        >
          <NavLink
            to={homeTarget}
            end
            aria-label="Go to home"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex w-full flex-row items-center justify-start gap-5 rounded-[0.9rem] px-5 py-4 text-base font-medium text-[#8f6f69] transition-all duration-300 hover:cursor-pointer ${
                isActive
                  ? "bg-[#bb5c50] font-semibold text-white shadow-[0_5px_9px_rgba(139,70,60,0.2)]"
                  : "hover:bg-[#f7e7e3] hover:text-[#a4544b]"
              }`
            }
          >
            <House size={21} strokeWidth={1.8} />
            Home
          </NavLink>
          {user?.couple_id && (
            <NavLink
              to={demo ? "/demo/manage-couple" : "/manage-couple"}
              aria-label="Go to Couple Details"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex w-full flex-row items-center justify-start gap-5 rounded-[0.9rem] px-5 py-4 text-base font-medium text-[#8f6f69] transition-all duration-200 hover:cursor-pointer ${
                  isActive
                    ? "bg-[#bb5c50] font-semibold text-white shadow-[0_5px_9px_rgba(139,70,60,0.2)]"
                    : "hover:bg-[#f7e7e3] hover:text-[#a4544b]"
                }`
              }
            >
              <Heart size={21} strokeWidth={1.8} />
              Couple Details
            </NavLink>
          )}

          {user?.couple_id && (
            <NavLink
              to={demo ? "/demo/experiences" : "/experiences"}
              aria-label="Go to experiences"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex w-full flex-row items-center justify-start gap-5 rounded-[0.9rem] px-5 py-4 text-base font-medium text-[#8f6f69] transition-all duration-200 hover:cursor-pointer ${
                  isActive
                    ? "bg-[#bb5c50] font-semibold text-white shadow-[0_5px_9px_rgba(139,70,60,0.2)]"
                    : "hover:bg-[#f7e7e3] hover:text-[#a4544b]"
                }`
              }
            >
              <Sparkles size={21} strokeWidth={1.8} />
              Experiences
            </NavLink>
          )}
          <button
            type="button"
            className="mt-8 flex flex-row items-center gap-5 rounded-[0.9rem] border-t border-[#f1e0dc] bg-transparent px-5 py-4 text-left text-base text-[#a27b74] transition-colors duration-300 hover:cursor-pointer hover:bg-red-50 hover:text-[#bb5c50] focus:bg-transparent active:bg-transparent md:mt-auto"
            onClick={() => {
              closeMenu();
              if (demo) {
                navigate("/");
              } else {
                logout();
              }
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};
