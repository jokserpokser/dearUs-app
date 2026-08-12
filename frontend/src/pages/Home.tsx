import { CommonButton } from "../components/CommonComponents";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 flex items-center bg-white">
        <div className="flex-1 min-w-0 h-full flex flex-col justify-center items-center text-center overflow-hidden">
          <div className="flex gap-3 items-center text-7xl max-w-175 ">
            <span className="font-bold text-black">
              Every moment we make{" "}
              <span className="text-[#a4544b]">together</span>
            </span>
          </div>
        </div>

        <div className="flex-none w-[50%] min-w-[320px] flex flex-col justify-center h-full z-10 items-center">
          <div className="flex flex-col gap-3 items-center">
            <span className="mt-4 text-black text-base max-w-md text-[24.5px]">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us.
            </span>
            <div className="flex gap-4 mt-4">
              <CommonButton
                text="Sign in"
                onClick={() => navigate("/login")}
              />
              <CommonButton
                text="Create an account"
                onClick={() => navigate("/register")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
