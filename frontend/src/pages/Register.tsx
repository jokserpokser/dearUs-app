import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div className="fixed inset-0 flex items-center bg-[#fff6d2]">
      {/* Form Side */}
      <div className="flex-none w-200 min-w-[320px] flex flex-col justify-center h-full z-10 items-center">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold text-[#371400]">
            Dear<span className="text-[#a4544b]">Us</span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center p-6 w-90"
        >
          <div className="flex gap-2">
            <span className="w-[49%]">
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
            <span className="w-[49%]">
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

          <span className="flex flex-col mt-5 w-[60%] self-center">
            <SubmitButton text="Create my account" />
          </span>
          {generalError && (
            <span className="text-red-500 text-xs text-start">
              {generalError}
            </span>
          )}
          <span className="text-xs text-[#545454]">
            Already have an account?{" "}
            <button
              className="text-[#a4544b] font-semibold hover:underline hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </span>
        </form>
      </div>
      {/* Left Side */}
      <div className="flex-1 min-w-0 h-full text-7xl font-bold items-center flex flex-col justify-center bg-white text-center overflow-hidden">
        <span className="text-[#371400]">Create your</span>
        <span className="text-[#a4544b]">account</span>
      </div>
    </div>
  );
};
