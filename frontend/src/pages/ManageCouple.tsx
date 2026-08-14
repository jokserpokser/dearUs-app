import { useState, useEffect } from "react";
import { CouplesService } from "../services/CouplesService";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

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
  const createdDate = new Date(couple.created_at).toLocaleDateString();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff6d2] p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-5xl font-bold text-[#371400] mb-2">
              Dear<span className="text-[#a4544b]">Us</span>
            </span>
            <p className="text-lg text-[#545454]">Manage Your Couple</p>
          </div>

          {/* Invitation Code Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-[#d0d0d0]">
            <span className="text-2xl font-bold text-[#371400] mb-4">
              Couple Invitation Code
            </span>
            <p className="text-sm text-[#545454] mb-4">
              Share this code with your partner to join your couple.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-[#f5f5f5] p-4 rounded border-2 border-[#d0d0d0]">
                <p className="text-2xl font-bold text-[#371400] text-center tracking-widest">
                  {couple.invite_code}
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className={`px-6 py-2 font-semibold rounded transition-colors duration-300 ${
                  copiedCode
                    ? "bg-green-500 text-white"
                    : "bg-[#a4544b] text-white hover:bg-[#8b3d36]"
                }`}
              >
                {copiedCode ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Couple Details */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-[#d0d0d0]">
            <span className="text-2xl font-bold text-[#371400] mb-6">
              Couple Details
            </span>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#545454]">CREATED</p>
                <p className="text-lg text-[#371400]">{createdDate}</p>
              </div>
              {couple.anniversary && (
                <div>
                  <p className="text-xs font-semibold text-[#545454]">
                    ANNIVERSARY
                  </p>
                  <p className="text-lg text-[#371400]">
                    {new Date(couple.anniversary).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              {couple.endearment && (
                <div>
                  <p className="text-xs font-semibold text-[#545454]">
                    ENDEARMENT
                  </p>
                  <p className="text-lg text-[#a4544b]">{couple.endearment}</p>
                </div>
              )}
            </div>
          </div>

          {/* Members Section */}
          <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#d0d0d0]">
            <span className="text-2xl font-bold text-[#371400] mb-6">
              Couple Members
            </span>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-4 bg-[#f5f5f5] rounded border border-[#e0e0e0]"
                >
                  <p className="font-semibold text-[#371400]">{member.name}</p>
                  <p className="text-sm text-[#545454]">{member.email}</p>
                  <p className="text-xs text-[#999]">
                    Joined: {new Date(member.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {members.length === 1 && (
                <div className="p-4 bg-[#ffeaa7] rounded border border-[#f0c674]">
                  <p className="text-sm text-[#545454]">
                    👋 Waiting for your partner to join using the invitation
                    code.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-[#a4544b] text-white font-semibold rounded-lg hover:bg-[#8b3d36] transition-colors duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
