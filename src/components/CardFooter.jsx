import { uplate } from "../data/team.js";

export default function CardFooter() {
  return (
    <footer className="card-footer">
      <span>{uplate.name}</span>
      <span>{uplate.year}</span>
    </footer>
  );
}
