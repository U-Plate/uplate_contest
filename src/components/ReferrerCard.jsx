import { useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import { useContests } from "../ContestsContext";
import { useContestIdParam } from "../useContestIdParam.js";
import BrandHeader from "./BrandHeader.jsx";
import CardFooter from "./CardFooter.jsx";

export default function ReferrerCard() {
  const contestId = useContestIdParam();
  const { createReferrer } = useContests();
  const { trigger } = useWebHaptics();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [referralLink, setReferralLink] = useState(null);
  const [copyState, setCopyState] = useState("idle");

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
    setSubmitting(true);
    try {
      await createReferrer(contestId, email.trim(), name.trim());
      trigger("medium");
      const link = `${window.location.origin}/?contestId=${encodeURIComponent(
        contestId,
      )}&referredBy=${encodeURIComponent(email.trim())}`;
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

  return (
    <article className="card directory-card" aria-labelledby="referrer-title">
      <BrandHeader />
      <section className="contest-tile" aria-live="polite">
        {!referralLink ? (
          <>
            <h2 className="contest-title" id="referrer-title">
              Become a referrer
            </h2>
            <p className="contest-desc">
              Sign up to get your own shareable referral link for this contest.
            </p>
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
