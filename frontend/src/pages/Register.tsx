import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  isValidEmail,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  normalizeEmail,
  normalizeName,
} from "../services/authValidation";

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
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setGeneralError("");
  };

  const handleRegister = async () => {
    const firstName = normalizeName(formData.firstName);
    const lastName = normalizeName(formData.lastName);
    const email = normalizeEmail(formData.email);
    const errors = {
      firstName: firstName ? "" : "First name is required",
      lastName: lastName ? "" : "Last name is required",
      email: !email
        ? "Email is required"
        : !isValidEmail(email)
          ? "Enter a valid email address"
          : "",
      password: !formData.password
        ? "Password is required"
        : formData.password.length < MIN_PASSWORD_LENGTH
          ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
          : formData.password.length > MAX_PASSWORD_LENGTH
            ? `Password must be at most ${MAX_PASSWORD_LENGTH} characters`
            : "",
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : "",
      coupleInviteCode: "",
    };

    if (Object.values(errors).some(Boolean)) {
      setFormErrors(errors);
      return;
    }

    const userData = {
      name: `${firstName} ${lastName}`,
      email,
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
            className="flex w-fit items-center gap-2 text-sm font-medium text-[#755f5b] transition-colors hover:text-[#b45f53] hover:cursor-pointer"
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
                autoComplete="given-name"
                maxLength={MAX_NAME_LENGTH}
                required
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
                autoComplete="family-name"
                maxLength={MAX_NAME_LENGTH}
                required
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
            autoComplete="email"
            maxLength={MAX_EMAIL_LENGTH}
            required
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            name="password"
            label="PASSWORD"
            value={formData.password}
            placeholder="Password"
            errorMessage={formErrors.password}
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_PASSWORD_LENGTH}
            required
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            name="confirmPassword"
            label="CONFIRM PASSWORD"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            errorMessage={formErrors.confirmPassword}
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_PASSWORD_LENGTH}
            required
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
              type="button"
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
