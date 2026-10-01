import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  icon: IconDefinition;
  className?: string;
};

// Renders a Font Awesome icon definition as a plain inline SVG. This avoids
// the runtime CSS injection of <FontAwesomeIcon /> (no flash of huge icons
// on first paint) and lets Tailwind size the icon via `className`.
const Icon = ({ icon, className = "h-4 w-4" }: IconProps) => {
  const [width, height, , , path] = icon.icon;
  const paths = Array.isArray(path) ? path : [path];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
};

export default Icon;
