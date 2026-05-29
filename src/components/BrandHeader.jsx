import { uplate } from "../data/team.js";

export default function BrandHeader() {
  return (
    <header className="brand-header">
      <span className="brand-mark" aria-hidden="true" />
      <div className="brand-text">
        <p className="brand-name">{uplate.name}</p>
        <p className="brand-line">{uplate.tagline}</p>
      </div>
    </header>
  );
}
