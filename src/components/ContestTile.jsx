import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useWebHaptics } from "web-haptics/react";
import { useContests } from "../ContestsContext";
import ReferralPitch from "./ReferralPitch.jsx";
import { firstName } from "../referrerName.js";

export default function ContestTile({ contestId, onLoaded }) {
  const [contest, setContest] = useState(null);
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const { getContestById, joinContest } = useContests();
  const { trigger } = useWebHaptics();
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get("referredBy") || undefined;
  const referrerName = firstName(searchParams.get("ref"));
  const APP_STORE_IOS = "https://apps.apple.com/us/app/uplate/id6752828206";
  const APP_STORE_ANDROID =
    "https://play.google.com/store/apps/details?id=com.njr.boilerFuel";

  function isAndroid() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return /android/i.test(ua);
  }

  async function enterContest() {
    setJoinError(null);
    if (!email) {
      setJoinError(
        contest?.type === "referral"
          ? "Please enter an email to continue."
          : "Please enter an email to join the contest.",
      );
      return;
    }
    setJoining(true);
    try {
      await joinContest(contestId, email.trim(), referredBy);
      trigger("medium");
      const storeLink = isAndroid() ? APP_STORE_ANDROID : APP_STORE_IOS;
      window.open(storeLink, "_blank");
    } catch (err) {
      console.error(err);
      setJoinError(
        contest?.type === "referral"
          ? "Something went wrong. Please try again."
          : "Failed to join contest. Please try again.",
      );
    } finally {
      setJoining(false);
    }
  }
  useEffect(() => {
    let mounted = true;
    setContest(null);

    // Simulate a fetch for contest data
    getContestById(contestId)
      .then((data) => {
        if (mounted) {
          setContest(data);
          onLoaded?.();
        }
      })
      .catch(() => {
        if (mounted) {
          setContest({ title: "Contest Not Found", description: "" });
          onLoaded?.();
        }
      });

    return () => {
      mounted = false;
    };
    // Intentionally only depend on contestId so a parent re-render doesn't restart the timer
  }, [contestId]);

  const isReferral = contest?.type === "referral";

  // Always render a tile — show a spinner while loading.
  return (
    <section
      className={`contest-tile${isReferral ? " contest-tile--pitch" : ""}`}
      aria-live="polite"
    >
      {!contest ? (
        <div className="spinner-wrap" aria-hidden="true">
          <div className="spinner" role="img" aria-label="Loading" />
          <p className="loading-label">Loading contest…</p>
        </div>
      ) : (
        <>
          {isReferral ? (
            <ReferralPitch referrerName={referrerName} />
          ) : (
            <>
              <h2 className="contest-title">{contest.title}</h2>
              <p className="contest-desc">{contest.description}</p>
            </>
          )}
          <input
            type="email"
            className="contest-input"
            placeholder={isReferral ? "Your email" : "Enter your email to enter"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => trigger("light")}
            disabled={joining}
          />
          {joinError && (
            <p className="contest-error" role="alert">
              {joinError}
            </p>
          )}
          <p className="contest-warning">
            {isReferral
              ? "Use this same email in the app."
              : "Use the same email when making an account on the app!"}
          </p>
          <button
            className={`contest-button${isReferral ? " contest-button--pitch" : ""}`}
            onClick={enterContest}
            disabled={joining}
            aria-busy={joining}
          >
            {joining ? (
              <>
                <div className="spinner" role="img" aria-label="Joining" />
                {isReferral ? "Opening…" : "Joining…"}
              </>
            ) : isReferral ? (
              "Get the free app"
            ) : (
              "Enter Contest"
            )}
          </button>
        </>
      )}
    </section>
  );
}
