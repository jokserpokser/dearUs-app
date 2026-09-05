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
          className="flex flex-row items-start justify-between gap-3 bg-[#FFEDEA] p-4 text-left text-xl font-semibold text-[#a4544b] sm:flex-row sm:items-center sm:px-6 lg:px-10"
          style={{ fontFamily: "Literata" }}
        >
          Experiences
          <button
            className="flex flex-row items-center justify-center gap-2 rounded-4xl bg-[#B25F56] px-4 py-2 text-sm text-white transition-all duration-300 hover:cursor-pointer hover:bg-[#A4544B]"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={14} />
            Add Experiences
          </button>
        </div>
        <div className="flex flex-col gap-2 p-6 text-left text-sm text-[#a4544b] sm:p-10 lg:p-20">
          <span
            className="text-3xl font-bold text-[#371400] sm:text-5xl"
            style={{ fontFamily: "Literata" }}
          >
            Our Shared Experiences
          </span>
          <span className="text-md">Memories we're chasing, together.</span>
        </div>
        <div className="flex flex-col text-[#4E260B] justify-center items-center">
          {experiences.length <= 0 ? (
            <div className="flex w-full max-w-100 flex-col items-center gap-4 px-6">
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
            <div className="grid w-full grid-cols-1 gap-4 px-4 pb-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-10 xl:grid-cols-4">
              {experiences.map((exp) => (
                <div
                  className="flex min-h-70 w-full flex-col gap-3 rounded-2xl bg-white p-5 text-left shadow-md transition duration-300 hover:cursor-pointer hover:bg-[#FFFCF7] active:mt-1"
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
