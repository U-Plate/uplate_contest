import { Link } from "react-router-dom";
import { useWebHaptics } from "web-haptics/react";

import BrandHeader from "./BrandHeader.jsx";
import CardFooter from "./CardFooter.jsx";
import ContestTile from "./ContestTile.jsx";

export default function DirectoryCard({ contestId = null }) {
  const { trigger } = useWebHaptics();

  return (
    <article className="card directory-card" aria-labelledby="directory-title">
      <BrandHeader />

      {!contestId && (
        <>
          <p className="eyebrow">NFC Cards</p>
          <h1 id="directory-title" className="directory-title">
            Team directory
          </h1>
          <p className="lede">
            Tap a name below to preview that teammate's NFC landing page.
          </p>
        </>
      )}

      {contestId && (
        <div className="contest-slot">
          <ContestTile contestId={contestId} />
        </div>
      )}

      <CardFooter />
    </article>
  );
}
