import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    coupleInviteCode: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    coupleInviteCode: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        firstName: !formData.firstName ? "First name is required" : "",
        lastName: !formData.lastName ? "Last name is required" : "",
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      }));
      return;
    }

    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await AuthService.register(
        userData.name,
        userData.email,
        userData.password,
      );

      const { user, token } = response;

      login(user, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
      setGeneralError("Failed to register. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleRegister();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-y-auto bg-[#fff9f7] lg:flex-row">
      {/* Left Side */}
      <div className="flex min-h-[30svh] w-full min-w-0 flex-1 flex-col items-center justify-center overflow-hidden bg-[#fff8f5] px-6 py-10 text-center text-5xl font-bold sm:text-6xl lg:h-full lg:w-1/2 lg:py-0 lg:text-7xl">
        <span className="text-[#211817]">Create your</span>
        <span className="text-[#ad5c50]">account</span>
      </div>
      {/* Form Side */}
      <div className="z-10 flex min-h-[70svh] w-full min-w-0 flex-none flex-col items-center justify-center px-6 py-10 lg:h-full lg:w-1/2 lg:px-8 lg:py-0">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-[#211817] sm:text-3xl">
            Dear<span className="text-[#b45f53]">Us</span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col justify-center gap-4 p-4 sm:p-6"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-fit items-center gap-2 text-sm font-medium text-[#755f5b] transition-colors hover:text-[#b45f53]"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
            <span className="w-full sm:w-[49%]">
              <InputField
                type="text"
                name="firstName"
                label="FIRST NAME"
                value={formData.firstName}
                placeholder="First Name"
                errorMessage={formErrors.firstName}
                onChange={handleInputChange}
              />
            </span>
            <span className="w-full sm:w-[49%]">
              <InputField
                type="text"
                name="lastName"
                label="LAST NAME"
                value={formData.lastName}
                placeholder="Last Name"
                errorMessage={formErrors.lastName}
                onChange={handleInputChange}
              />
            </span>
          </div>

          <InputField
            type="email"
            name="email"
            label="EMAIL"
            value={formData.email}
            placeholder="example@email.com"
            errorMessage={formErrors.email}
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            name="password"
            label="PASSWORD"
            value={formData.password}
            placeholder="Password"
            errorMessage={formErrors.password}
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            name="confirmPassword"
            label="CONFIRM PASSWORD"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            errorMessage={formErrors.confirmPassword}
            onChange={handleInputChange}
          />

          <span className="mt-5 flex w-full max-w-xs flex-col self-center">
            <SubmitButton text="Create my account" />
          </span>
          {generalError && (
            <span className="text-xs text-start text-[#b45f53]">
              {generalError}
            </span>
          )}
          <span className="text-xs text-[#755f5b]">
            Already have an account?{" "}
            <button
              className="font-semibold text-[#b45f53] hover:cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};
