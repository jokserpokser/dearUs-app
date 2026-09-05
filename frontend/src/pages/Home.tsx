import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import landingPageBackground from "../assets/images/landingpage-BG.png";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col bg-[#fff9f7] text-[#241817]">
      <section className="relative flex min-h-[calc(100svh-76px)] flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_83%_50%,rgba(255,222,207,0.8),transparent_42%),radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.9),transparent_48%)] px-6 py-14 sm:px-10 sm:py-20 lg:flex-row lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(rgba(181,111,96,0.2)_0.7px,transparent_0.7px)] bg-size-[18px_18px]" />
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center lg:w-1/2 lg:items-start">
          <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left lg:ml-30">
            <span
              className="mb-5 text-7xl font-semibold text-[#b45f53] sm:mb-6"
              style={{ fontFamily: "Literata" }}
            >
              DearUs
            </span>
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#f0b8a5] bg-[#fff8f5] px-4 py-2 text-sm font-medium text-[#7c4439] shadow-[0_2px_8px_rgba(164,84,75,0.08)] sm:mb-10">
              <span className="h-2 w-2 rounded-full bg-[#d88978]" />A private
              sanctuary designed for two
            </div>

            <h1 className="m-0 max-w-2xl text-[clamp(3.2rem,8vw,5.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[#211817]">
              Every moment we
              <br />
              make <em className="font-normal text-[#ad5c50]">together</em>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-[1.45] text-[#755f5b] sm:text-xl">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us. Crafted into an intimate private
              digital space for the two of you.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-full border border-[#3c302d] bg-transparent px-8 py-3.5 text-base font-semibold text-[#2a201e] transition-colors hover:bg-[#2a201e] hover:text-white hover:cursor-pointer"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="flex items-center justify-center gap-3 rounded-full bg-[#b45f53] px-8 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(180,95,83,0.2)] transition-all hover:bg-[#9f5046] hover:cursor-pointer"
              >
                Create an account
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-12 hidden min-h-90 w-full items-center justify-center lg:mt-0 lg:flex lg:min-h-0 lg:w-1/2">
          <img
            src={landingPageBackground}
            alt="A couple sharing a quiet moment together"
            className="h-full max-h-190 w-full max-w-none rounded-4xl object-cover object-center shadow-[0_24px_60px_rgba(164,84,75,0.16)] lg:max-h-none"
          />
        </div>
      </section>
    </main>
  );
};
