import { Link } from "react-router-dom";
import { useWebHaptics } from "web-haptics/react";
import { team } from "../data/team.js";
import BrandHeader from "./BrandHeader.jsx";
import CardFooter from "./CardFooter.jsx";

export default function DirectoryCard() {
  const { trigger } = useWebHaptics();

  return (
    <article
      className="card directory-card"
      aria-labelledby="directory-title"
    >
      <BrandHeader />

      <p className="eyebrow">NFC Cards</p>
      <h1 id="directory-title" className="directory-title">
        Team directory
      </h1>
      <p className="lede">
        Tap a name below to preview that teammate's NFC landing page.
      </p>

      <nav className="card-list" aria-label="UPlate team cards">
        {team.map((member) => (
          <Link
            key={member.slug}
            to={`/${member.slug}`}
            onClick={() => trigger("selection")}
          >
            {member.firstName}
          </Link>
        ))}
      </nav>

      <CardFooter />
    </article>
  );
}
