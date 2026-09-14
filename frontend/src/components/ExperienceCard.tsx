import { CircleCheck, LoaderCircle } from "lucide-react";

type Experience = {
  id: number;
  title: string;
  notes?: string;
  is_completed: boolean;
  created_at: string;
  photo_url?: string;
  completed_at: string;
};

type ExperienceCardProps = {
  experience: Experience;
  onClick: (experience: Experience) => void;
};

export const ExperienceCard = ({
  experience,
  onClick,
}: ExperienceCardProps) => {
  return (
    <div
      className="flex min-h-70 w-full flex-col gap-3 rounded-2xl bg-white p-5 text-left shadow-md transition duration-300 hover:cursor-pointer hover:bg-[#FFFCF7] active:mt-1"
      onClick={() => onClick(experience)}
    >
      <span
        className={`flex flex-row justify-center items-center text-xs w-fit p-2 gap-2 rounded-2xl ${
          experience.is_completed ? "bg-[#E8E0BD]" : "bg-[#FFEDEA]"
        }`}
      >
        {experience.is_completed ? (
          <CircleCheck size={14} />
        ) : (
          <LoaderCircle size={14} />
        )}
        {experience.is_completed ? "Completed" : "Not Completed"}
      </span>
      <div className="flex flex-col">
        <span
          className="text-[#371400] text-xl font-semibold"
          style={{ fontFamily: "Literata" }}
        >
          {experience.title}
        </span>
        {experience.notes && (
          <span className="text-[#a4544b] text-sm">{experience.notes}</span>
        )}
      </div>
    </div>
  );
};
