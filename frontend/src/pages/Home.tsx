import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col bg-[#fff9f7] text-[#241817]">
      <section className="relative flex min-h-[calc(100svh-76px)] flex-1 overflow-hidden bg-[radial-gradient(circle_at_83%_50%,rgba(255,222,207,0.8),transparent_42%),radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.9),transparent_48%)] px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(rgba(181,111,96,0.2)_0.7px,transparent_0.7px)] bg-size-[18px_18px]" />
        <div className="relative z-10 flex w-full max-w-7xl flex-col justify-center">
          <div className="flex flex-col max-w-2xl">
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#f0b8a5] bg-[#fff8f5] px-4 py-2 text-sm font-medium text-[#7c4439] shadow-[0_2px_8px_rgba(164,84,75,0.08)] sm:mb-10">
              <span className="h-2 w-2 rounded-full bg-[#d88978]" />A private
              sanctuary designed for two
            </div>

            <h1 className="m-0 max-w-2xl text-left text-[clamp(3.2rem,8vw,5.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[#211817]">
              Every moment we
              <br />
              make <em className="font-normal text-[#ad5c50]">together</em>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-[1.45] text-[#755f5b] sm:text-xl text-left">
              Our bucket lists, photos, milestones, and all the little
              adventures that make us, us. Crafted into an intimate private
              digital space for the two of you.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-full border border-[#3c302d] bg-transparent px-8 py-3.5 text-base font-semibold text-[#2a201e] transition-colors hover:bg-[#2a201e] hover:text-white"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="flex items-center justify-center gap-3 rounded-full bg-[#b45f53] px-8 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(180,95,83,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#9f5046]"
              >
                Create an account
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
