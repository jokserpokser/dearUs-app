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
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
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
  autoComplete,
  minLength,
  maxLength,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className={`text-sm font-semibold text-[#7c4439] ${labelCenter ? "self-center" : "self-start"}`}
        >
          {label} {required && <span className="text-[#b45f53]">*</span>}
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
          className={`rounded-md border-2 border-[#f0b8a5] bg-[#fffdfc] p-2 text-sm text-[#755f5b] focus:outline-none focus:ring-2 focus:ring-[#b45f53] ${textCenter ? "text-center" : "text-left"}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          onChange={onChange}
          className={`rounded-md border-2 border-[#f0b8a5] bg-[#fffdfc] p-2 text-sm text-[#755f5b] focus:outline-none focus:ring-2 focus:ring-[#b45f53] ${textCenter ? "text-center" : "text-left"}`}
        />
      )}
      {errorMessage && (
        <span
          className={`text-xs text-red-500 ${textCenter ? "text-center" : "text-start"}`}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="w-full rounded-lg border-2 border-[#b45f53] bg-[#b45f53] px-5 py-2 font-semibold text-white transition-colors duration-300 hover:cursor-pointer hover:bg-[#9f5046]"
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
