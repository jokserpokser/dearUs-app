import { Camera, CircleCheck, LoaderCircle, Plus, Trash } from "lucide-react";
import { Divider } from "./CommonComponents";
import { ExperiencesService } from "../services/ExperiencesService";
import { useRef, useState } from "react";

interface ExperienceModalProps {
  modalOptions: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

  experienceDetails: {
    id: number;
    title: string;
    notes?: string;
    is_completed: boolean;
    created_at: string;
    photo_url?: string;
    completed_at?: string;
  };

  onExperienceUpdated?: () => void | Promise<void>;
}

export const ExperienceDetailsModal = ({
  experienceModalProps,
}: {
  experienceModalProps: ExperienceModalProps;
}) => {
  const {
    id,
    title,
    notes,
    is_completed,
    created_at,
    photo_url,
    completed_at,
  } = experienceModalProps.experienceDetails;

  const { isOpen, setIsOpen } = experienceModalProps.modalOptions;
  const { onExperienceUpdated } = experienceModalProps;

  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createdDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(created_at));

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setPhoto(selectedFile);
    setPhotoPreview(URL.createObjectURL(selectedFile));
  };

  const handleCompletion = async () => {
    if (isCompleting) return;

    try {
      if (!photo) {
        console.error("Photo is required to complete experience.");
        alert("Photo is required to complete experience.");
        return;
      }

      setIsCompleting(true);

      const requestDetails = {
        experienceId: id,
        file: photo,
      };
      await ExperiencesService.completeExperience(requestDetails);
      await onExperienceUpdated?.();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to complete experience.", error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await ExperiencesService.deleteExperience(id);
      await onExperienceUpdated?.();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete experience.", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-180 flex flex-col items-center gap-10"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoUpload}
            />

            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex flex-col items-start text-left w-full">
                <div className="flex flex-row mb-5 justify-between items-center w-full">
                  <span
                    className={`flex flex-row justify-center items-center text-xs w-fit p-2 gap-2 rounded-2xl text-[#371400] ${
                      is_completed ? "bg-[#E8E0BD]" : "bg-[#FFEDEA]"
                    }`}
                  >
                    {is_completed ? (
                      <CircleCheck size={14} />
                    ) : (
                      <LoaderCircle size={14} />
                    )}

                    {is_completed ? "Completed" : "Not Completed"}
                  </span>
                </div>
                <span
                  className="text-[#371400] text-2xl font-semibold"
                  style={{ fontFamily: "Literata" }}
                >
                  {title}
                </span>
                <span className="text-sm text-[#A16A4B] font-light">
                  {notes}
                </span>
                <span className="text-[12px] text-[#877266] font-light mt-5">
                  Created {createdDate}
                </span>
              </div>

              <Divider />
              {is_completed ? (
                <div className="flex flex-col border-2 items-center border-[#D7CEC6] rounded-3xl w-full bg-[#FFFCF7] p-6 gap-4 my-3">
                  {photo_url ? (
                    <div className="w-full max-w-150 aspect-video rounded-3xl overflow-hidden border-2 border-[#D7CEC6] bg-white">
                      <img
                        src={photo_url}
                        alt="Completed memory"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full max-w-120 aspect-video rounded-3xl border-2 border-[#D7CEC6] bg-white text-[#877163] text-sm">
                      No memory photo available
                    </div>
                  )}

                  <div className="flex flex-col gap-1 text-center">
                    <span className="text-[#371400] text-xs">
                      🤎 Completed together on{" "}
                      {completed_at
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(completed_at))
                        : "Completed"}{" "}
                      🤎
                    </span>
                    <span className="text-[#877163] text-sm"></span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col border-2 items-center border-[#D7CEC6] border-dashed rounded-3xl w-full bg-[#FFFCF7] p-10 gap-7 my-3">
                  {photoPreview ? (
                    <div
                      className="w-full max-w-150 aspect-video rounded-3xl overflow-hidden border-2 border-[#D7CEC6] bg-white cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img
                        src={photoPreview}
                        alt="Selected memory"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex bg-white rounded-full w-25 h-25 justify-center items-center border-2 border-[#D7CEC6] text-[#D7CEC6] transition-normal duration-200 hover:text-[#877163] hover:cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={50} />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <span
                      className="text-[#371400] font-semibold text-2xl"
                      style={{ fontFamily: "Literata" }}
                    >
                      Memories are waiting
                    </span>
                    <span className="text-[#877163] text-sm">
                      Pick a date, bring your favorite cozy things, and turn
                      this plan into a shared memory together.
                    </span>
                  </div>

                  <button
                    className="flex flex-row bg-[#A4544B] text-white py-3 px-6 rounded-3xl justify-center items-center gap-3 w-60 hover:cursor-pointer hover:bg-[#8b4840] transition-normal duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={handleCompletion}
                    disabled={isCompleting}
                  >
                    {isCompleting ? (
                      <>
                        <LoaderCircle size={20} className="animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Mark as Complete
                      </>
                    )}
                  </button>

                  <span className="text-[#95817494] text-xs font-light">
                    Marking as complete will let you attach a keepsake photo for
                    remembrance.
                  </span>
                </div>
              )}

              <Divider />

              <div className="flex flex-row items-center justify-between w-full min-h-19">
                {deleteConfirmation ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full min-h-19 rounded-2xl border border-[#F0D4CD] bg-[#FFF6F2] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-full bg-[#F8E3DE] text-[#A4544B]">
                        <Trash size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#371400] text-left">
                          Delete this experience?
                        </span>
                        <span className="text-xs font-light text-[#877266]">
                          This will remove it from your shared bucket list.
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto justify-end gap-2">
                      <button
                        className="border border-[#D7CEC6] rounded-3xl px-4 py-2 text-xs font-light text-[#371400] transition-colors duration-200 hover:bg-white hover:border-[#A16A4B] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => setDeleteConfirmation(false)}
                        disabled={isDeleting}
                      >
                        Keep Experience
                      </button>
                      <button
                        className="rounded-3xl bg-[#A4544B] px-4 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#8b4840] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row w-full min-h-19 justify-between items-center py-3">
                      <button
                        className="flex flex-row justify-center items-center text-xs rounded-md font-light px-2 py-3 gap-2 text-[#A4544B] transition-colors duration-200 hover:text-[#e7412f] hover:cursor-pointer hover:bg-red-100"
                        onClick={() => setDeleteConfirmation(true)}
                      >
                        <Trash size={16} />
                        Delete Experience
                      </button>
                      <button
                        className="border border-[#D7CEC6] rounded-3xl px-4 py-1 text-sm font-light text-[#371400] transition-colors duration-200 hover:bg-[#FFFCF7] hover:border-[#A16A4B] hover:cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
