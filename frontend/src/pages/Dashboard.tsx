import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import coupleBackground from "../assets/images/CoupleBG.png";
import { isDemoMode } from "../services/demoMode";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen overflow-y-auto bg-[#fff9f7] pt-16 text-[#241817] md:ml-69 md:pt-0">
        <div className="relative flex min-h-[calc(100svh-64px)] items-center overflow-hidden px-6 py-14 sm:px-10 lg:min-h-screen lg:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(rgba(181,111,96,0.2)_0.7px,transparent_0.7px)] bg-size-[18px_18px]" />
          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center lg:items-start lg:text-left">
            <span
              className="text-3xl font-semibold text-[#b45f53]"
              style={{ fontFamily: "Literata" }}
            >
              DearUs
            </span>
            <span className="mt-6 rounded-full border border-[#f0b8a5] bg-[#fff8f5] px-4 py-2 text-sm font-medium text-[#7c4439]">
              Your shared space
            </span>
            <h1 className="mt-8 max-w-2xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-[#211817] sm:text-6xl lg:text-7xl">
              Every moment is better{" "}
              <em className="font-normal text-[#ad5c50]">together.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#755f5b]">
              Keep the little plans, memories, and milestones that make your
              story yours.
            </p>

            {!user?.couple_id ? (
              <div className="mt-8 flex w-full max-w-md flex-col gap-3 text-sm font-semibold sm:flex-row">
                <button
                  type="button"
                  className="w-full rounded-full border border-[#b45f53] px-5 py-3 text-[#b45f53] transition-colors hover:bg-[#fff0eb]"
                  onClick={() => navigate("/join-couple")}
                >
                  Join a couple
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-[#b45f53] px-5 py-3 text-white transition-colors hover:bg-[#9f5046]"
                  onClick={() => navigate("/create-couple")}
                >
                  Create a couple
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="mt-8 rounded-full bg-[#b45f53] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9f5046]"
                onClick={() =>
                  navigate(
                    isDemoMode() ? "/demo/manage-couple" : "/manage-couple",
                  )
                }
              >
                Couple Details
              </button>
            )}
          </div>

          <div className="absolute bottom-0 right-0 top-0 hidden w-[48%] overflow-hidden lg:block">
            <img
              src={coupleBackground}
              alt="A couple sharing a moment together"
              className="h-full w-full object-cover object-center opacity-75"
            />
            <div className="absolute inset-0 bg-[#fff1eb]/45" />
          </div>
        </div>
      </div>
    </>
  );
};
