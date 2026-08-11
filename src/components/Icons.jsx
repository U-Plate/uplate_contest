export const EmailIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8 6a1 1 0 0 0 1 0l8-6" />
  </svg>
);

export const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.5 0H13v1.55h.05c.5-.9 1.7-1.85 3.5-1.85 3.75 0 4.45 2.45 4.45 5.65V20.5h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.28-1.9 2.6V20.5h-4v-11Z" />
  </svg>
);

export const GlobeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.9",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

/** Fork + knife — personalized campus dining */
export const PlateIcon = (props) => (
  <svg {...strokeProps} {...props}>
    <path d="M6 2.5v6.5a2.6 2.6 0 0 0 5.2 0V2.5" />
    <path d="M8.6 9v12.5" />
    <path d="M18 21.5V3c2 1.7 2.8 4.3 2.8 6.7 0 2.1-1.1 3.5-2.8 3.9" />
  </svg>
);

/** Funnel — filter by dietary needs */
export const FilterIcon = (props) => (
  <svg {...strokeProps} {...props}>
    <path d="M3.5 5h17l-6.5 7.5v5.9a1 1 0 0 1-.55.9l-3 1.5a1 1 0 0 1-1.45-.9V12.5L3.5 5Z" />
  </svg>
);

/** Target — calorie and macro goals */
export const TargetIcon = (props) => (
  <svg {...strokeProps} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

/** Check — effortless logging */
export const CheckIcon = (props) => (
  <svg {...strokeProps} strokeWidth="2.4" {...props}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ChevronIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);
