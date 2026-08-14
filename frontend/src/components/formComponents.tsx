interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  errorMessage?: string;
  labelCenter?: boolean;
  textCenter?: boolean;
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
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={`text-[#545454] font-medium text-xs ${labelCenter ? "self-center" : "self-start"}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`text-[#202020] text-sm p-1 border-2 rounded-sm ${textCenter ? "text-center" : "text-left"} bg-white border-[#968c87] focus:outline-none focus:border-[#4b2723] transition-colors duration-300 `}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs text-start -mt-2">
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
      className="bg-white text-[#512b16] font-semibold py-2 px-5 w-full rounded-lg hover:bg-[#e0e0d1] transition-colors duration-300 hover:cursor-pointer border-2"
    >
      {text}
    </button>
  );
};
