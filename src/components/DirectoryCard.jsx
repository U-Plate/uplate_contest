import BrandHeader from "./BrandHeader.jsx";
import CardFooter from "./CardFooter.jsx";
import ContestTile from "./ContestTile.jsx";
import { useContestIdParam } from "../useContestIdParam.js";

export default function DirectoryCard() {
  const contestId = useContestIdParam();

  if (!contestId) return null;

  return (
    <article className="card directory-card" aria-labelledby="directory-title">
      <BrandHeader />

      <div className="contest-slot">
        <ContestTile contestId={contestId} />
      </div>

      <CardFooter />
    </article>
  );
}
