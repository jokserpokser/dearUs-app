import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { InputField } from "./formComponents";
import { Modal } from "./Modal";
import { ExperiencesService } from "../services/ExperiencesService";

interface ModalOptions {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface AddExperienceModalProps {
  modalOptions: ModalOptions;
  onExperienceAdded: () => void | Promise<void>;
}

export const AddExperienceModal = ({
  modalOptions,
  onExperienceAdded,
}: AddExperienceModalProps) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [generalError, setGeneralError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() === "") {
      setTitleErrorMessage("Title is required.");
      return;
    }

    const experienceData = {
      title,
      notes,
    };

    try {
      await ExperiencesService.addExperience(experienceData);
      await onExperienceAdded();
    } catch (error) {
      console.error(error);
      setGeneralError(true);
      return;
    }

    setTitle("");
    setNotes("");
    setTitleErrorMessage("");
    setGeneralError(false);
    modalOptions.setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalOptions.isOpen}
      onClose={() => modalOptions.setIsOpen(false)}
      labelledBy="add-experience-title"
      className="flex w-[calc(100%-2rem)] max-w-130 flex-col items-center gap-8 p-5 sm:gap-10 sm:p-8 md:p-10"
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="flex bg-[#FFEDEA] rounded-full w-15 h-15 justify-center items-center">
          <Heart size={30} color="#A4544B" />
        </div>

        <div className="flex flex-col items-center text-center">
          <span
            id="add-experience-title"
            className="text-[#371400] text-2xl font-semibold"
            style={{ fontFamily: "Literata" }}
          >
            Add New Experience
          </span>
          <span className="text-sm text-[#A16A4B] w-[90%]">
            Dream up the next adventure or sweet moment to share together.
          </span>
        </div>
      </div>

      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          type="text"
          name="title"
          value={title}
          placeholder="What's the experience? (eg. 'Sunset at the Beach')"
          required
          errorMessage={titleErrorMessage}
          onChange={(event) => setTitle(event.target.value)}
        />

        <InputField
          label="Notes"
          type="text"
          name="notes"
          value={notes}
          placeholder="Add any details, plans, or why this matters to you two."
          multiline
          onChange={(event) => setNotes(event.target.value)}
        />
        <div className="mt-6 flex w-full flex-col-reverse items-stretch justify-between gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => modalOptions.setIsOpen(false)}
            className="text-sm hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex flex-row text-sm justify-center items-center gap-2 bg-[#B25F56] hover:bg-[#A4544B] text-white py-2 px-4 transition-all duration-300 rounded-4xl hover:cursor-pointer"
          >
            <Plus size={14} />
            Add to Experiences
          </button>
        </div>
        {generalError && (
          <span className="text-red-500 text-xs">
            Unable to add Experience. Please try again.
          </span>
        )}
      </form>
    </Modal>
  );
};
