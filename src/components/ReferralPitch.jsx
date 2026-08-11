import { CheckIcon, FilterIcon, PlateIcon, TargetIcon } from "./Icons.jsx";

// Copy + structure mirror the app's onboarding "Here's how UPlate helps you…"
// screens from the UPlate design (see uplate-landing/DESIGN.md).
const FEATURES = [
  { Icon: PlateIcon, title: "Every dining hall menu, personalized" },
  { Icon: FilterIcon, title: "Filtered for your allergies and diet" },
  { Icon: TargetIcon, title: "Calorie and macro goals that fit you" },
  { Icon: CheckIcon, title: "Log a meal in one tap" },
];

export default function ReferralPitch({ referrerName }) {
  return (
    <div className="pitch">
      {referrerName ? (
        <>
          <h2 className="pitch-title pitch-title--referred">
            <span className="pitch-title__name">{referrerName}</span> wants you
            to download UPlate.
          </h2>
          <p className="pitch-lede">Here's why:</p>
        </>
      ) : (
        <>
          <h2 className="pitch-title">
            Eat better,
            <br />
            every day.
          </h2>
          <p className="pitch-lede">Your campus dining, made personal.</p>
        </>
      )}

      <ul className="pitch-features">
        {FEATURES.map(({ Icon, title }) => (
          <li className="pitch-feature" key={title}>
            <span className="pitch-feature__badge" aria-hidden="true">
              <Icon />
            </span>
            <p className="pitch-feature__title">{title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
