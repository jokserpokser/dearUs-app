import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CouplesService } from "../services/CouplesService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const CreateCouple = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    anniversary: null as Date | null,
    endearment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      anniversary: date,
    }));
  };

  const handleCreateCouple = async () => {
    if (user?.couple_id) {
      navigate("/dashboard", { replace: true });
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    try {
      const anniversaryString = formData.anniversary
        ? [
            formData.anniversary.getFullYear(),
            String(formData.anniversary.getMonth() + 1).padStart(2, "0"),
            String(formData.anniversary.getDate()).padStart(2, "0"),
          ].join("-")
        : undefined;

      const response = await CouplesService.createCouple(
        anniversaryString,
        formData.endearment,
      );
      const { couple } = response;

      // Update both state and localStorage
      if (user) {
        const updatedUser = { ...user, couple_id: couple.id };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setTimeout(() => {
        navigate("/manage-couple");
      }, 2000);
    } catch (error) {
      console.error("Error creating couple:", error);
      setGeneralError("Failed to create couple. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateCouple();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-y-auto bg-[#fff9f7] lg:flex-row">
      <div className="flex min-h-[35svh] w-full min-w-0 flex-1 flex-col items-center justify-center overflow-hidden bg-[#fff8f5] px-6 py-10 text-center lg:h-full lg:w-1/2 lg:items-start lg:px-16 lg:py-0 lg:text-left">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <span
            className="text-5xl font-bold text-[#211817] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "Literata" }}
          >
            Create your
          </span>
          <span
            className="text-5xl font-normal italic text-[#ad5c50] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "Literata" }}
          >
            couple
          </span>
          <span className="mt-4 max-w-md text-sm leading-relaxed text-[#755f5b]">
            One account, two people, endless adventures. Let's get you set
            up.{" "}
          </span>
        </div>
      </div>
      {/* Divider */}
      <div className="h-0.5 w-1/2 bg-[#f0b8a5] lg:h-[50%] lg:w-0.5"></div>

      <div className="z-10 flex min-h-[65svh] w-full min-w-0 flex-none flex-col items-center justify-center px-6 py-10 lg:h-full lg:w-1/2 lg:px-8 lg:py-0">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-[#211817] sm:text-3xl">
            Dear<span className="text-[#b45f53]">Us</span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col justify-center gap-4 p-4 sm:p-6"
        >
          <>
            <p className="mb-4 text-sm leading-relaxed text-[#755f5b]">
              Create a couple and invite your partner to start sharing memories
              and experiences together.
            </p>

            <div className="flex w-full flex-col gap-2">
              <label className="block text-sm font-semibold text-[#7c4439]">
                TOGETHER SINCE
              </label>
              <DatePicker
                selected={formData.anniversary}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select your anniversary"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                yearDropdownItemNumber={100}
                className="w-full rounded-md border-2 border-[#f0b8a5] bg-[#fffdfc] p-2 text-center text-sm text-[#755f5b] transition-colors duration-300 focus:border-[#b45f53] focus:outline-none"
              />
            </div>

            <InputField
              type="text"
              name="endearment"
              label="ENDEARMENT"
              value={formData.endearment}
              labelCenter
              textCenter
              placeholder="Honey, Love, Sweetheart"
              onChange={handleInputChange}
            />
            <span className="mt-5 flex w-full max-w-xs flex-col self-center">
              <SubmitButton
                text={isLoading ? "Creating..." : "Create Couple"}
              />
            </span>
          </>

          {generalError && (
            <span className="text-xs text-start text-[#b45f53]">
              {generalError}
            </span>
          )}

          <span className="text-xs text-[#755f5b]">
            Already have an invite code?{" "}
            <button
              type="button"
              className="font-semibold text-[#b45f53] hover:cursor-pointer hover:underline"
              onClick={() => navigate("/join-couple")}
            >
              Join a couple
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};
