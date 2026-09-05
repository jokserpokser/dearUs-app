import { CommonButton } from "../components/CommonComponents";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen overflow-y-auto bg-white pt-16 md:ml-69 md:pt-0">
        <div className="flex min-h-screen flex-col items-stretch lg:flex-row lg:items-center">
          <div className="order-2 flex min-h-[55svh] w-full min-w-0 flex-1 flex-col items-center justify-center px-6 py-12 text-center lg:order-2 lg:h-screen lg:w-auto lg:px-0 lg:py-0">
            <div className="flex w-full max-w-175 flex-col items-center gap-6 text-start text-5xl sm:text-6xl lg:w-[60%] lg:text-7xl">
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
          <div
            className="order-1 z-10 flex min-h-[45svh] w-full flex-none flex-col items-center justify-center lg:order-1 lg:h-screen lg:w-[70%]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 218, 213, 0.5), rgba(255, 218, 213, 0.5)), url(/src/assets/images/CoupleBG.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
