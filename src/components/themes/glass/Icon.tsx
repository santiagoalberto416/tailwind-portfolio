import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FC } from "react";

type IconProps = {
  icon: IconDefinition;
  className?: string;
  // Provide a title only when the icon carries meaning on its own
  title?: string;
};

// Renders a Font Awesome icon as a plain inline SVG. It needs no runtime CSS,
// so icons keep their size during server rendering.
const Icon: FC<IconProps> = ({ icon, className = "", title }) => {
  const [width, height, , , pathData] = icon.icon;
  const paths = Array.isArray(pathData) ? pathData : [pathData];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className={`lg-icon ${className}`}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
};

export default Icon;
