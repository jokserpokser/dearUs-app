interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  label,
  type,
  name,
  value,
  placeholder,
  hasError,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[#545454] font-medium self-start text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`text-[#202020] p-2 border rounded-lg bg-white ${hasError ? "border-red-500" : "border-[#968c87]"}`}
      />
    </div>
  );
};

export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="bg-white text-[#512b16] font-semibold py-4 px-6 w-full rounded-lg hover:bg-[#e0e0d1] transition-colors duration-300 hover:cursor-pointer"
    >
      {text}
    </button>
  );
};
