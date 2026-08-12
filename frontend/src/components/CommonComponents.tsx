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
      className="w-48 border-black border text-black font-semibold py-2 px-4 rounded hover:bg-[#f5cfb6] hover:*:text-white transition-colors duration-300 cursor-pointer *"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
