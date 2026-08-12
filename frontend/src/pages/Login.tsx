import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      }));
      return;
    }

    try {
      const response = await AuthService.login(
        formData.email,
        formData.password,
      );
      const { user, token } = response;

      login(user, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in user:", error);
      setGeneralError(
        "Failed to login. Please check your credentials and try again.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="fixed inset-0 flex items-center bg-[#fff6d2]">
      <div className="flex-1 min-w-0 h-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="flex flex-col gap-2 items-start">
          <span className="text-7xl font-bold text-[#371400]">Sign in to</span>
          <span className="text-7xl font-bold text-[#a4544b]">DearUs</span>
          <span className="mt-4 text-[#545454] text-sm">
            Your memories and moments are waiting for you.
          </span>
        </div>
      </div>
      {/* Divider */}
      <div className="w-0.5 h-[50%] bg-[#b6b1ae]"></div>

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

          <span className="flex flex-col mt-5 w-[60%] self-center">
            <SubmitButton text="Login" />
          </span>
          {generalError && (
            <span className="text-red-500 text-xs text-start">
              {generalError}
            </span>
          )}
          <span className="text-xs text-[#545454]">
            Don&apos;t have an account?{" "}
            <button
              className="text-[#a4544b] font-semibold hover:underline hover:cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};
