import { CommonButton } from "../components/CommonComponents";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center overflow-y-auto bg-white lg:flex-row">
        <div className="flex min-h-[48svh] w-full min-w-0 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center lg:h-full lg:w-1/2 lg:py-0">
          <div className="flex max-w-175 items-center gap-3 text-5xl sm:text-6xl lg:text-7xl">
            <span className="font-bold text-black">
              Every moment we make{" "}
              <span className="text-[#a4544b]">together</span>
            </span>
          </div>
        </div>

        <div className="z-10 flex min-h-[52svh] w-full min-w-0 flex-none flex-col items-center justify-center px-6 pb-12 lg:h-full lg:w-1/2 lg:px-8 lg:pb-0">
          <div className="flex w-full max-w-md flex-col items-center gap-3">
            <span className="mt-4 max-w-md text-center text-lg leading-relaxed text-black sm:text-xl lg:text-[24.5px]">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us.
            </span>
            <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <CommonButton text="Sign in" onClick={() => navigate("/login")} />
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
