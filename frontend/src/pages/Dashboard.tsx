import { CommonButton } from "../components/CommonComponents";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import heartIcon from "../assets/icons/drawn-heart-icon.png";

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center bg-white overflow-y-auto">
        <div className="flex-1 min-w-0 h-full flex flex-col  items-center text-center">
          <span className="bg-[#fff5cd] px-3 py-3 rounded-3xl text-[#ff914d]">
            <img
              src={heartIcon}
              alt="heart"
              className="w-6 h-6 inline-block mr-2"
            />
            {user?.name}
          </span>
          <div className="flex flex-col gap-6 items-center text-7xl max-w-175 w-[60%] text-start">
            <span className="font-bold text-black w-[90%]">
              Every moment we make{" "}
              <span className="text-[#a4544b]">together</span>
            </span>
            <span className="text-[15px] text-black">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us.
            </span>
            <div className="flex flex-col gap-3 self-start text-sm w-full text-[#545454] font-semibold">
              You are not in a couple yet.
              <CommonButton text="Join a couple" />
              <CommonButton text="Create a couple" />
            </div>
          </div>
        </div>

        <div className="flex-none bg-[#fff5cd] w-[70%] min-w-[320px] flex flex-col justify-center h-screen z-10 items-center">
          <div className="flex flex-col gap-3 items-center">
            <span className="mt-4 text-black text-base max-w-md text-[24.5px]">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
