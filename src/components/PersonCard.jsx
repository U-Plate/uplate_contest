import { useEffect } from "react";
import { uplate } from "../data/team.js";
import BrandHeader from "./BrandHeader.jsx";
import CardFooter from "./CardFooter.jsx";
import ActionButton from "./ActionButton.jsx";
import { EmailIcon, LinkedInIcon, GlobeIcon } from "./Icons.jsx";

export default function PersonCard({ person }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${person.fullName} — ${uplate.name}`;
    return () => {
      document.title = previous;
    };
  }, [person.fullName]);

  const initial = person.firstName.charAt(0).toUpperCase();

  return (
    <article className="card" aria-labelledby="card-title">
      <BrandHeader />

      <section className="identity">
        <div className="avatar" aria-hidden="true">
          {initial}
        </div>
        <h1 id="card-title" className="person-name">
          {person.firstName}
        </h1>
        <p className="person-role">{person.role}</p>
      </section>

      <nav className="actions" aria-label={`Contact ${person.firstName}`}>
        <ActionButton
          variant="primary"
          href={`mailto:${person.email}`}
          label={person.email}
          icon={EmailIcon}
        />
        <ActionButton
          href={person.linkedin}
          label="LinkedIn"
          icon={LinkedInIcon}
          external
        />
        <ActionButton
          href={uplate.website}
          label={uplate.websiteLabel}
          icon={GlobeIcon}
          external
        />
      </nav>

      <CardFooter />
    </article>
  );
}
