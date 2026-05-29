import { useWebHaptics } from "web-haptics/react";
import { ChevronIcon } from "./Icons.jsx";

export default function ActionButton({
  href,
  label,
  icon: Icon,
  variant = "secondary",
  external = false,
}) {
  const { trigger } = useWebHaptics();
  const external_props = external
    ? { target: "_blank", rel: "noopener" }
    : {};

  const handlePress = () => {
    trigger(variant === "primary" ? "medium" : "light");
  };

  return (
    <a
      className={`action action--${variant}`}
      href={href}
      onClick={handlePress}
      {...external_props}
    >
      <span className="action__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="action__label">{label}</span>
      <ChevronIcon className="action__chevron" />
    </a>
  );
}
