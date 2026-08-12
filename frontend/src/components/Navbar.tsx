import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white border-black w-full h-12 flex items-center px-4">
      <div
        className="text-black font-semibold text-2xl hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Dear<span className="text-[#a4544b]">Us</span>
      </div>
    </div>
  );
};
