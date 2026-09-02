import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Plus, Heart } from "lucide-react";
import { ExperiencesService } from "../services/ExperiencesService";

export const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiencesData = await ExperiencesService.getExperiences();
        setExperiences(experiencesData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#fff6f4] h-screen ml-69">
        <div
          className="flex flex-row bg-[#FFEDEA] text-[#a4544b] font-semibold text-xl p-4 text-left justify-between items-center px-10"
          style={{ fontFamily: "Literata" }}
        >
          Experiences
          <button className="flex flex-row text-sm justify-center items-center gap-2 bg-[#B25F56] hover:bg-[#A4544B] text-white py-2 px-4 transition-all duration-300 rounded-4xl hover:cursor-pointer">
            <Plus size={14} />
            Add Experiences
          </button>
        </div>
        <div className="flex flex-col gap-2 p-20 text-[#a4544b] text-sm text-left">
          <span
            className="text-5xl text-[#371400] font-bold"
            style={{ fontFamily: "Literata" }}
          >
            Our Shared Experiences
          </span>
          <span className="text-md">Memories we're chasing, together.</span>
        </div>
        <div className="flex flex-col text-[#4E260B] justify-center items-center">
          {!experiences.length && (
            <div className="flex flex-col max-w-100 gap-4 items-center">
              <div className="flex bg-[#FFEDEA] rounded-full w-40 h-40 justify-center items-center">
                <Heart size={80} color="#A4544B" />
              </div>
              <span className="font-bold" style={{ fontFamily: "Literata" }}>
                No Experiences yet.
              </span>
              <span className="text-sm">
                Your shared journey is just the beginning. Start adding the
                adventures you want to chase together.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
