import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Navigate to login page after logout
  };
  return (
    <div className="dashboard-page">
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.name}!</p>
      <span
        onClick={handleLogout}
        className="text-[#a4544b] font-semibold hover:underline hover:cursor-pointer"
      >
        Logout
      </span>
    </div>
  );
};
