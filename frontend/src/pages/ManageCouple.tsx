import { useState, useEffect } from "react";
import { CouplesService } from "../services/CouplesService";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ReadOnlyInputField } from "../components/formComponents";
import { Copy } from "lucide-react";

interface Couple {
  id: number;
  invite_code: string;
  anniversary?: string;
  endearment?: string;
  created_at: string;
}

interface CoupleData {
  couple: Couple;
  members: Array<{
    id: number;
    name: string;
    email: string;
    created_at: string;
  }>;
}

export const ManageCouple = () => {
  const navigate = useNavigate();
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const fetchCoupleData = async () => {
      try {
        const data = await CouplesService.getMyCouple();
        setCoupleData(data);
      } catch (err) {
        console.error("Error fetching couple data:", err);
        setError("Failed to load couple details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupleData();
  }, []);

  const handleCopyCode = () => {
    if (coupleData?.couple.invite_code) {
      navigator.clipboard.writeText(coupleData.couple.invite_code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fff6d2] pt-16 md:ml-69 md:pt-0">
          <div className="text-center">
            <p className="text-lg text-[#545454]">Loading couple details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !coupleData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fff6d2] pt-16 md:ml-69 md:pt-0">
          <div className="text-center">
            <p className="text-lg text-red-500 mb-4">{error}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-[#a4544b] text-white rounded hover:bg-[#8b3d36]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  const { couple, members } = coupleData;

  const coupleAnniversary = couple.anniversary
    ? new Date(couple.anniversary).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff6d2] px-4 pb-8 pt-16 md:ml-69 md:px-6 md:pt-0">
        <div className="mx-auto mb-8 mt-8 max-w-2xl md:mb-12 md:mt-20">
          <h1 className="text-[#693B20] font-semibold text-left">
            Manage Couple
          </h1>
          <p className="text-[#A4544B] text-md text-left">
            Update your relationship details and connection.
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-5 rounded-2xl bg-white p-4 sm:p-6 md:rounded-4xl md:p-10">
          <div className="relative flex flex-col text-left bg-[#FFEDEA] border border-[#b25f5631] p-4 rounded-2xl text-[#A4544B] w-full">
            <span className="font-medium mb-2">Couple Invite Code:</span>
            <span
              className="mb-1 flex flex-row flex-wrap items-center gap-2 text-3xl font-medium text-[#B25F56] sm:text-4xl"
              style={{ fontFamily: "Literata" }}
            >
              {couple.invite_code}
              <Copy
                className="w-5 h-5 text-[#B25F56] hover:cursor-pointer"
                onClick={handleCopyCode}
              />
              {copiedCode && (
                <span className="text-[#B25F56] text-sm mt-1">Copied!</span>
              )}
            </span>

            <span className="text-sm">
              Share this code with your partner to connect.
            </span>
          </div>
          {/* Invitation Code Section */}
          <div className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ReadOnlyInputField
                label="Partner 1"
                value={members[0]?.name || "N/A"}
              />
              <ReadOnlyInputField
                label="Partner 2"
                value={members[1]?.name || "Waiting for partner..."}
                shaded={members[1] ? false : true}
              />
            </div>

            <ReadOnlyInputField
              label="Together Since"
              value={coupleAnniversary}
            />
            <ReadOnlyInputField
              label="Endearment"
              value={couple.endearment || "N/A"}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex w-full justify-center gap-4 sm:mt-8 sm:w-auto">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-lg bg-[#B25F56] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:cursor-pointer hover:bg-[#b25f56d8] sm:w-auto"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
