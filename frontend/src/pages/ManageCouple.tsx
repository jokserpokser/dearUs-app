import { useState, useEffect } from "react";
import { CouplesService } from "../services/CouplesService";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ReadOnlyInputField } from "../components/formComponents";

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
      <div className="fixed inset-0 flex items-center justify-center bg-[#fff6d2]">
        <div className="text-center">
          <p className="text-lg text-[#545454]">Loading couple details...</p>
        </div>
      </div>
    );
  }

  if (error || !coupleData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#fff6d2]">
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
      <div className="min-h-screen bg-[#fff6d2] p-8">
        <div className="mb-12 mt-20 text-start">
          <p className="text-2xl text-[#545454] font-semibold">Manage Couple</p>
        </div>
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
          {/* Header */}

          {/* Invitation Code Section */}
          <div className="flex flex-col w-80 gap-6">
            <span onClick={handleCopyCode} className="cursor-pointer">
              <ReadOnlyInputField
                label="Couple Invite Code"
                value={couple.invite_code}
              />
              {copiedCode && (
                <span className="text-[#10b981] text-sm mt-1">Copied!</span>
              )}
            </span>

            <ReadOnlyInputField
              label="Partner 1"
              value={members[0]?.name || "N/A"}
            />
            <ReadOnlyInputField
              label="Partner 2"
              value={members[1]?.name || "Waiting for partner..."}
            />
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
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-[#a4544b] text-white font-semibold rounded-lg hover:bg-[#8b3d36] hover:cursor-pointer transition-colors duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
