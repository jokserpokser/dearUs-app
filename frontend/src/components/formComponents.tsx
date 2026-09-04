interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  errorMessage?: string;
  labelCenter?: boolean;
  textCenter?: boolean;
  multiline?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  label,
  type,
  name,
  value,
  placeholder,
  errorMessage,
  labelCenter,
  textCenter,
  multiline = false,
  required = false,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className={`text-sm font-semibold text-[#462613] ${labelCenter ? "self-center" : "self-start"}`}
        >
          {label} {required && <span className="text-[#B37068]">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={
            onChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
          }
          className={`text-sm p-2 border-2 text-[#A16A4B] bg-[#FDFBF7] border-[#F2E4CE] rounded-md ${textCenter ? "text-center" : "text-left"} focus:outline-none focus:ring-2 focus:ring-[#A16A4B]`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`text-sm p-2 border-2 text-[#A16A4B] bg-[#FDFBF7] border-[#F2E4CE] rounded-md ${textCenter ? "text-center" : "text-left"} focus:outline-none focus:ring-2 focus:ring-[#A16A4B]`}
        />
      )}
      {errorMessage && (
        <span className="text-red-500 text-xs text-start">{errorMessage}</span>
      )}
    </div>
  );
};

export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="bg-white text-[#512b16] font-semibold py-2 px-5 w-full rounded-lg hover:bg-[#e0e0d1] transition-colors duration-300 hover:cursor-pointer border-2"
    >
      {text}
    </button>
  );
};

export const ReadOnlyInputField = ({
  label,
  value,
  shaded = false,
}: {
  label?: string;
  value: string;
  shaded?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[#545454] font-medium text-sm text-left">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        readOnly
        className={`text-[#202020] text-sm p-2 border-2 rounded-lg ${shaded ? "bg-[#FFEDEA]" : "bg-white"} border-[#a4544b2f] focus:outline-none text-center`}
      />
    </div>
  );
};
