import { useEffect, useState } from "react";
import { useWebHaptics } from "web-haptics/react";

export default function ContestTile({ contestId, onLoaded }) {
  const [contest, setContest] = useState(null);
  const { trigger } = useWebHaptics();
  const APP_STORE_IOS = "https://apps.apple.com/us/app/uplate/id6752828206";
  const APP_STORE_ANDROID =
    "https://play.google.com/store/apps/details?id=com.njr.boilerFuel";

  function isAndroid() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return /android/i.test(ua);
  }

  function enterContest() {
    trigger("medium");
    const storeLink = isAndroid() ? APP_STORE_ANDROID : APP_STORE_IOS;
    window.open(storeLink, "_blank");
  }
  useEffect(() => {
    let mounted = true;
    setContest(null);

    // Simulate a fetch for contest data
    const timer = setTimeout(() => {
      if (!mounted) return;
      const data = {
        id: contestId,
        title: `Monster Raffle`,
        description: `Use UPlate for 1 day for a chance to win a pallet of Monster Energy drinks!`,
      };
      setContest(data);
      if (typeof onLoaded === "function") onLoaded();
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
    // Intentionally only depend on contestId so a parent re-render doesn't restart the timer
  }, [contestId]);

  // Always render a tile — show a spinner while loading.
  return (
    <section className="contest-tile" aria-live="polite">
      {!contest ? (
        <div className="spinner-wrap" aria-hidden="true">
          <div className="spinner" role="img" aria-label="Loading" />
          <p className="loading-label">Loading contest…</p>
        </div>
      ) : (
        <>
          <h2 className="contest-title">{contest.title}</h2>
          <p className="contest-desc">{contest.description}</p>
          <input
            type="text"
            className="contest-input"
            placeholder="Enter your email to enter"
            onClick={() => trigger("light")}
          />
          <p className="contest-warning">
            Use the same email when making an account on the app!
          </p>
          <button className="contest-button" onClick={enterContest}>
            Enter Contest
          </button>
        </>
      )}
    </section>
  );
}
