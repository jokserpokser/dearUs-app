import { InputField, SubmitButton } from "../components/formComponents";
import { useState } from "react";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    coupleInviteCode: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    coupleInviteCode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center bg-[#fff6d2]">
      {/* Header Side */}
      <div className="flex-1 min-w-0 h-full text-7xl font-bold items-center flex flex-col justify-center bg-white text-center overflow-hidden">
        <span className="text-[#371400]">Create your</span>
        <span className="text-[#a4544b]">account</span>
      </div>

      {/* Form Side */}
      <div className="flex-none w-[420px] min-w-[320px] flex flex-col justify-center h-full z-10 items-center">
        <form className="flex flex-col gap-4 justify-center p-6 w-full">
          <div className="flex gap-2">
            <span className="w-[49%]">
              <InputField
                type="text"
                name="firstName"
                label="FIRST NAME"
                value={formData.firstName}
                placeholder="First Name"
                hasError={!formErrors.firstName}
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
                hasError={!formErrors.lastName}
                onChange={handleInputChange}
              />
            </span>
          </div>

          <InputField
            type="email"
            name="email"
            label="EMAIL"
            value={formData.email}
            placeholder="Email"
            hasError={!formErrors.email}
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            name="password"
            label="PASSWORD"
            value={formData.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
          <InputField
            type="password"
            name="confirmPassword"
            label="CONFIRM PASSWORD"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
          <InputField
            type="text"
            name="coupleInviteCode"
            label="COUPLE INVITE CODE"
            value={formData.coupleInviteCode}
            placeholder="COUPLE INVITE CODE (OPTIONAL)"
            onChange={handleInputChange}
          />
          <span className="flex flex-col mt-5 w-[60%] self-center">
            <SubmitButton text="Create my account" />
          </span>
        </form>
      </div>
    </div>
  );
};
