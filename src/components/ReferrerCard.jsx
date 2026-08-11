import { useEffect, useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import { useContests } from "../ContestsContext";
import { useContestIdParam } from "../useContestIdParam.js";
import { firstName } from "../referrerName.js";
import BrandHeader from "./BrandHeader.jsx";
import CardFooter from "./CardFooter.jsx";

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReferrerCard() {
  const contestId = useContestIdParam();
  const { createReferrer, getContestById } = useContests();
  const { trigger } = useWebHaptics();

  const [contest, setContest] = useState(null);
  const [contestLoaded, setContestLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [referralLink, setReferralLink] = useState(null);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (!contestId) return;
    let mounted = true;
    setContest(null);
    setContestLoaded(false);

    getContestById(contestId)
      .then((data) => {
        if (mounted) {
          setContest(data);
          setContestLoaded(true);
        }
      })
      .catch(() => {
        if (mounted) setContestLoaded(true);
      });

    return () => {
      mounted = false;
    };
    // Only refetch when the contest changes
  }, [contestId]);

  async function handleSubmit() {
    setError(null);
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter an email.");
      return;
    }
    if (!instagram.trim()) {
      setError("Please enter your Instagram handle.");
      return;
    }
    setSubmitting(true);
    try {
      const handle = instagram.trim().replace(/^@/, "");
      await createReferrer(contestId, email.trim(), name.trim(), handle);
      trigger("medium");
      // `ref` is display-only — it greets the viewer by the referrer's first
      // name. Attribution still runs entirely off `referredBy`.
      const link = `${window.location.origin}/?contestId=${encodeURIComponent(
        contestId,
      )}&referredBy=${encodeURIComponent(email.trim())}&ref=${encodeURIComponent(
        firstName(name),
      )}`;
      setReferralLink(link);
    } catch (err) {
      console.error(err);
      setError("Failed to sign up as a referrer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    trigger("light");
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
    }
  }

  if (!contestId) return null;

  const isReferral = contest?.type === "referral";

  return (
    <article className="card directory-card" aria-labelledby="referrer-title">
      <BrandHeader />
      <section className="contest-tile" aria-live="polite">
        {!contestLoaded ? (
          <div className="spinner-wrap" aria-hidden="true">
            <div className="spinner" role="img" aria-label="Loading" />
            <p className="loading-label">Loading contest…</p>
          </div>
        ) : !referralLink ? (
          <>
            <h2 className="contest-title" id="referrer-title">
              {isReferral ? contest.title : "Become a referrer"}
            </h2>
            <p className="contest-desc">
              {isReferral
                ? contest.description
                : "Sign up to get your own shareable referral link for this contest."}
            </p>
            {contest && (
              <p className="contest-dates">
                {formatDate(contest.startDate)} – {formatDate(contest.endDate)}
              </p>
            )}
            {isReferral && (
              <p className="contest-warning">
                Sign up below to get your own shareable referral link.
              </p>
            )}
            <input
              type="text"
              className="contest-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={() => trigger("light")}
              disabled={submitting}
            />
            <input
              type="email"
              className="contest-input"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => trigger("light")}
              disabled={submitting}
            />
            <input
              type="text"
              className="contest-input"
              placeholder="Instagram handle"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              onClick={() => trigger("light")}
              disabled={submitting}
            />
            {error && (
              <p className="contest-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="contest-button"
              onClick={handleSubmit}
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <div className="spinner" role="img" aria-label="Signing up" />
                  Signing up...
                </>
              ) : (
                "Sign up to refer"
              )}
            </button>
          </>
        ) : (
          <>
            <h2 className="contest-title">You're in!</h2>
            <p className="contest-desc">
              Share this link — anyone who joins through it will be credited to
              you.
            </p>
            {contest && (
              <p className="contest-dates">
                {formatDate(contest.startDate)} – {formatDate(contest.endDate)}
              </p>
            )}
            <div className="referral-link-box">
              <span className="referral-link-text">{referralLink}</span>
            </div>
            <button className="contest-button" onClick={handleCopy}>
              {copyState === "copied"
                ? "Copied!"
                : copyState === "error"
                  ? "Copy failed — copy manually"
                  : "Copy link"}
            </button>
          </>
        )}
      </section>
      <CardFooter />
    </article>
  );
}
