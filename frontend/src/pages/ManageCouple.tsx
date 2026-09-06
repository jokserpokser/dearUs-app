import { useState, useEffect } from "react";
import { CouplesService } from "../services/CouplesService";
import { useAuth } from "../context/AuthContext";
import { isDemoMode } from "../services/demoMode";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { InputField, ReadOnlyInputField } from "../components/formComponents";
import { Copy } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const { user, setUser, setCouple } = useAuth();
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [anniversary, setAnniversary] = useState<Date | null>(null);
  const [endearment, setEndearment] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState("");

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

  const startEditing = () => {
    if (coupleData?.couple.anniversary) {
      const [year, month, day] = coupleData.couple.anniversary
        .split("T")[0]
        .split("-");
      setAnniversary(
        new Date(Number(year), Number(month) - 1, Number(day), 12),
      );
    } else {
      setAnniversary(null);
    }
    setEndearment(coupleData?.couple.endearment || "");
    setSaveError("");
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      const anniversaryString = anniversary
        ? [
            anniversary.getFullYear(),
            String(anniversary.getMonth() + 1).padStart(2, "0"),
            String(anniversary.getDate()).padStart(2, "0"),
          ].join("-")
        : undefined;
      const response = isDemoMode()
        ? {
            couple: {
              ...coupleData!.couple,
              anniversary: anniversaryString || null,
              endearment: endearment || null,
            },
          }
        : await CouplesService.updateMyCouple(anniversaryString, endearment);
      setCoupleData((current) =>
        current
          ? {
              ...current,
              couple: {
                ...response.couple,
                anniversary: anniversaryString,
              },
            }
          : current,
      );
      setCouple(response.couple);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating couple details:", err);
      setSaveError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLeaveCouple = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this couple? You will need a new invite code to join again.",
    );

    if (!confirmed) {
      return;
    }

    setIsLeaving(true);
    setLeaveError("");

    try {
      if (!isDemoMode()) {
        await CouplesService.leaveCouple();
      }
      const updatedUser = user ? { ...user, couple_id: null } : user;
      setUser(updatedUser);
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      navigate(isDemoMode() ? "/demo" : "/dashboard", { replace: true });
    } catch (err) {
      console.error("Error leaving couple:", err);
      setLeaveError("Failed to leave couple. Please try again.");
    } finally {
      setIsLeaving(false);
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
    ? (() => {
        const [year, month, day] = couple.anniversary.split("T")[0].split("-");
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }).format(
          new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))),
        );
      })()
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

            {isEditing ? (
              <>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-left text-sm font-semibold text-[#7c4439]">
                    Together Since
                  </label>
                  <DatePicker
                    selected={anniversary}
                    onChange={(date: Date | null) =>
                      setAnniversary(
                        date
                          ? new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                              12,
                            )
                          : null,
                      )
                    }
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select your anniversary"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    className="w-full rounded-md border-2 border-[#f0b8a5] bg-[#fffdfc] p-2 text-center text-sm text-[#755f5b] focus:outline-none focus:ring-2 focus:ring-[#b45f53]"
                  />
                </div>
                <InputField
                  label="Endearment"
                  type="text"
                  name="endearment"
                  value={endearment}
                  textCenter
                  containerClassName="gap-2"
                  placeholder="Honey, Love, Sweetheart"
                  onChange={(event) => setEndearment(event.target.value)}
                />
              </>
            ) : (
              <>
                <ReadOnlyInputField
                  label="Together Since"
                  value={coupleAnniversary}
                />
                <ReadOnlyInputField
                  label="Endearment"
                  value={couple.endearment || "N/A"}
                />
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex w-full justify-center gap-4 sm:mt-8 sm:w-auto">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full rounded-lg border-2 border-[#B25F56] px-8 py-3 font-semibold text-[#B25F56] transition-colors duration-300 hover:cursor-pointer hover:bg-[#fff0ed] sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full rounded-lg bg-[#B25F56] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:cursor-pointer hover:bg-[#b25f56d8] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={startEditing}
                  className="w-full rounded-lg border-2 border-[#B25F56] px-8 py-3 font-semibold text-[#B25F56] transition-colors duration-300 hover:cursor-pointer hover:bg-[#fff0ed] sm:w-auto"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full rounded-lg bg-[#B25F56] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:cursor-pointer hover:bg-[#b25f56d8] sm:w-auto"
                >
                  Go to Dashboard
                </button>
              </>
            )}
          </div>
          {saveError && <p className="text-sm text-red-500">{saveError}</p>}
          {!isDemoMode() && (
            <div className="mt-4 w-full border-t border-[#ead6d1] pt-4 text-center">
              <button
                type="button"
                onClick={handleLeaveCouple}
                disabled={isLeaving}
                className="text-sm font-semibold text-red-600 underline-offset-4 hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLeaving ? "Leaving..." : "Leave Couple"}
              </button>
              {leaveError && (
                <p className="mt-2 text-sm text-red-500">{leaveError}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
