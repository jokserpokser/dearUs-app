import { CommonButton, DashboardItem } from "../components/CommonComponents";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import heartIcon from "../assets/icons/drawn-heart-icon.png";
import { useNavigate } from "react-router-dom";
import { ListTodo, Asterisk } from "lucide-react";
export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center bg-white overflow-y-auto">
        <div className="flex-1 min-w-0 h-screen flex flex-col items-center text-center justify-center">
          <span className="bg-[#fff5cd] px-3 py-3 rounded-3xl text-black mb-10">
            <img
              src={heartIcon}
              alt="heart"
              className="w-6 h-6 inline-block mr-2"
            />
            {user?.name}
          </span>
          <div className="flex flex-col gap-6 items-center text-7xl max-w-175 w-[60%] text-start">
            <span className="font-bold text-black">
              Every moment we make{" "}
              <span className="text-[#a4544b]">together</span>
            </span>
            <span className="text-[15px] text-black">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us.
            </span>
            {!user?.couple_id ? (
              <div className="flex flex-col gap-3 self-start text-sm w-full text-[#545454] font-semibold">
                You are not in a couple yet.
                <CommonButton
                  text="Join a couple"
                  onClick={() => navigate("/join-couple")}
                />
                <CommonButton
                  text="Create a couple"
                  onClick={() => navigate("/create-couple")}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3 self-start text-sm w-full text-[#545454] font-semibold">
                <CommonButton
                  text="Manage your Couple"
                  onClick={() => navigate("/manage-couple")}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex-none bg-[#fff5cd] w-[70%] min-w-[320px] flex flex-col justify-center h-screen z-10 items-center ">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-40">
            {/* Items for Navigation */}
            <DashboardItem
              label="Bucket List"
              icon={ListTodo}
              onClick={() => navigate("/bucket-list")}
            />
            <DashboardItem
              label="Coming Soon"
              icon={Asterisk}
              onClick={() => {}}
            />
            <DashboardItem
              label="Coming Soon"
              icon={Asterisk}
              onClick={() => {}}
            />
            <DashboardItem
              label="Coming Soon"
              icon={Asterisk}
              onClick={() => {}}
            />
            <DashboardItem
              label="Coming Soon"
              icon={Asterisk}
              onClick={() => {}}
            />
            <DashboardItem
              label="Coming Soon"
              icon={Asterisk}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};
