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
    setIsLoading(true);
    setGeneralError("");

    try {
      const anniversaryString = formData.anniversary
        ? formData.anniversary.toISOString().split("T")[0]
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
    <div className="fixed inset-0 flex items-center bg-[#ffc9a7]">
      <div className="flex-1 min-w-0 h-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="flex flex-col gap-2 items-start">
          <span className="text-7xl font-bold text-[#371400]">Create your</span>
          <span className="text-7xl font-bold text-[#fbf7e4]">couple</span>
          <span className="mt-4 text-[#545454] text-sm">
            One account, two people, endless adventures. Let's get you set
            up.{" "}
          </span>
        </div>
      </div>
      {/* Divider */}
      <div className="w-0.5 h-[50%] bg-[#433d38]"></div>

      <div className="flex-none w-[50%] min-w-[320px] flex flex-col justify-center h-full z-10 items-center">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold text-[#371400]">
            Dear<span className="text-[#a4544b]">Us</span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center p-6 w-90"
        >
          <>
            <p className="text-sm text-[#545454] mb-4">
              Create a couple and invite your partner to start sharing memories
              and experiences together.
            </p>

            <div className="flex flex-col gap-2 w-full">
              <label className="block text-xs font-semibold text-[#545454]">
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
                className="w-full text-[#202020] text-sm p-1 border-2 rounded-sm bg-white border-[#968c87] focus:outline-none focus:border-[#4b2723] transition-colors duration-300 text-center"
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
            <span className="flex flex-col mt-5 w-[60%] self-center">
              <SubmitButton
                text={isLoading ? "Creating..." : "Create Couple"}
              />
            </span>
          </>

          {generalError && (
            <span className="text-red-500 text-xs text-start">
              {generalError}
            </span>
          )}

          <span className="text-xs text-[#545454]">
            Already have an invite code?{" "}
            <button
              type="button"
              className="text-[#a4544b] font-semibold hover:underline hover:cursor-pointer"
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
