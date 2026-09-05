import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouplesService } from "../services/CouplesService";
import { useAuth } from "../context/AuthContext";
import { InputField, SubmitButton } from "../components/formComponents";
import { Navbar } from "../components/Navbar";

export const JoinCouple = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?.couple_id) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (!inviteCode.trim()) {
      setError("Invite code is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await CouplesService.joinCouple(inviteCode.trim());

      if (user) {
        const updatedUser = { ...user, couple_id: response.couple.id };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      navigate("/dashboard");
    } catch (requestError: unknown) {
      const responseMessage = axios.isAxiosError(requestError)
        ? requestError.response?.data?.message
        : undefined;
      setError(
        responseMessage ||
          "Unable to join this couple. Please check the invite code and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="fixed inset-0 flex flex-col items-center justify-center overflow-y-auto bg-[#fff9f7] pt-16 md:ml-69 md:pt-0">
        <section className="flex min-h-full w-full flex-col items-center justify-center px-6 py-10 lg:px-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffe9e2] text-[#b45f53]">
              <Heart size={40} fill="currentColor" />
            </div>
            <p className="text-3xl font-bold text-[#211817] sm:text-4xl">
              Find your <span className="text-[#b45f53]">partner</span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg flex-col items-center gap-6 p-4 text-center sm:p-8"
          >
            <p className="max-w-md text-center text-base leading-relaxed text-[#755f5b] sm:text-lg">
              Your partner&apos;s invite code is the key to your shared space.
            </p>
            <InputField
              type="text"
              name="inviteCode"
              label="INVITE CODE"
              value={inviteCode}
              placeholder="XXXXXX"
              labelCenter
              textCenter
              errorMessage={error}
              onChange={(event) =>
                setInviteCode(event.target.value.toUpperCase())
              }
            />
            <span className="mt-5 flex w-full max-w-sm flex-col self-center text-base">
              <SubmitButton text={isLoading ? "Joining..." : "Join couple"} />
            </span>
            <button
              type="button"
              onClick={() => navigate("/create-couple")}
              className="flex items-center justify-center gap-2 text-base font-medium text-[#755f5b] transition-colors hover:text-[#b45f53]"
            >
              Create a new couple instead
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-2 flex items-center justify-center gap-2 text-base font-medium text-[#755f5b] transition-colors hover:text-[#b45f53]"
            >
              <ArrowLeft size={18} />
              Back to dashboard
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
