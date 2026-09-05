import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
    <div className="fixed inset-0 flex flex-col items-center overflow-y-auto bg-[#fff9f7] lg:flex-row">
      <div className="flex min-h-[38svh] w-full min-w-0 flex-col items-center justify-center overflow-hidden px-6 py-10 text-center lg:h-full lg:w-1/2 lg:py-0">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <span className="text-5xl font-bold text-[#211817] sm:text-6xl lg:text-7xl">
            Sign in to
          </span>
          <span className="text-5xl font-bold text-[#ad5c50] sm:text-6xl lg:text-7xl">
            DearUs
          </span>
          <span className="mt-4 text-sm text-[#755f5b]">
            Your memories and moments are waiting for you.
          </span>
        </div>
      </div>
      {/* Divider */}
      <div className="h-0.5 w-1/2 bg-[#f0b8a5] lg:h-[50%] lg:w-0.5"></div>

      <div className="z-10 flex min-h-[62svh] w-full min-w-0 flex-none flex-col items-center justify-center px-6 py-10 lg:h-full lg:w-1/2 lg:px-8 lg:py-0">
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

          <span className="mt-5 flex w-full max-w-xs flex-col self-center">
            <SubmitButton text="Login" />
          </span>
          {generalError && (
            <span className="text-xs text-start text-[#b45f53]">
              {generalError}
            </span>
          )}
          <span className="text-xs text-[#755f5b]">
            Don&apos;t have an account?{" "}
            <button
              className="font-semibold text-[#b45f53] hover:cursor-pointer hover:underline"
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
