import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Plus, Heart, CircleCheck, LoaderCircle } from "lucide-react";
import { ExperiencesService } from "../services/ExperiencesService";
import { AddExperienceModal } from "../components/AddExperienceModal";
import { ExperienceDetailsModal } from "../components/ExperienceDetailsModal";

type Experience = {
  id: number;
  title: string;
  notes?: string;
  is_completed: boolean;
  created_at: string;
  photo_url?: string;
  completed_at: string;
};

export const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEDModalOpen, setIsEDModalOpen] = useState(false);
  const [chosenExperience, setChosenExperience] = useState<Experience>();

  const fetchExperiences = useCallback(async () => {
    try {
      const experiencesData = await ExperiencesService.getExperiences();
      setExperiences(experiencesData.experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }, []);

  const handleExperienceDetailsClick = (exp: Experience) => {
    setChosenExperience(exp);
    setIsEDModalOpen(true);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <>
      <Navbar />
      <AddExperienceModal
        modalOptions={{ isOpen: isModalOpen, setIsOpen: setIsModalOpen }}
      />
      {chosenExperience && (
        <ExperienceDetailsModal
          experienceModalProps={{
            experienceDetails: chosenExperience,
            modalOptions: {
              isOpen: isEDModalOpen,
              setIsOpen: setIsEDModalOpen,
            },
            onExperienceUpdated: fetchExperiences,
          }}
        />
      )}
      <div className="min-h-screen bg-[#fff6f4] pt-16 md:ml-69 md:pt-0">
        <div
          className="flex flex-row bg-[#FFEDEA] text-[#a4544b] font-semibold text-xl p-4 text-left justify-between items-center px-10"
          style={{ fontFamily: "Literata" }}
        >
          Experiences
          <button
            className="flex flex-row text-sm justify-center items-center gap-2 bg-[#B25F56] hover:bg-[#A4544B] text-white py-2 px-4 transition-all duration-300 rounded-4xl hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
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
          {experiences.length <= 0 ? (
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
          ) : (
            <div className="grid grid-cols-4 px-20 w-full">
              {experiences.map((exp) => (
                <div
                  className="flex flex-col text-left bg-white w-90 h-70 p-5 rounded-2xl shadow-md gap-3 hover:bg-[#FFFCF7] transition duration-300 hover:cursor-pointer active:mt-1"
                  onClick={() => handleExperienceDetailsClick(exp)}
                >
                  <span
                    className={`flex flex-row justify-center items-center text-xs w-fit p-2 gap-2 rounded-2xl ${
                      exp.is_completed ? "bg-[#E8E0BD]" : "bg-[#FFEDEA]"
                    }`}
                  >
                    {exp.is_completed ? (
                      <CircleCheck size={14} />
                    ) : (
                      <LoaderCircle size={14} />
                    )}

                    {exp.is_completed ? "Completed" : "Not Completed"}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="text-[#371400] text-xl font-semibold"
                      style={{ fontFamily: "Literata" }}
                    >
                      {exp.title}
                    </span>
                    {exp.notes && (
                      <span className="text-[#a4544b] text-sm">
                        {exp.notes}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
