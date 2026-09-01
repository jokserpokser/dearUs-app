import type { StringQueryType } from "vite/types/importGlob.js";

export const CommonButton = ({
  text,
  onClick,
}: {
  text: StringQueryType;
  onClick?: () => void;
}) => {
  return (
    <button
      className="w-full border border-black text-black bg-white font-semibold py-3 px-4 rounded-4xl hover:bg-[#FFDAD5] hover:*:text-white transition-colors duration-300 cursor-pointer *"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const DashboardItem = ({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex flex-col text-xl items-center justify-center gap-2 text-[#a74c42] font-medium w-50 h-50 p-5 rounded-2xl hover:bg-[#a74c4228] hover:*:transition-colors duration-300 cursor-pointer *"
      onClick={onClick}
    >
      <Icon size={48} />
      {label}
    </div>
  );
};
