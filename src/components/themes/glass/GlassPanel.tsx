import { FC, HTMLAttributes } from "react";

type GlassElement = "div" | "article" | "section" | "aside" | "li" | "header";

type GlassPanelProps = HTMLAttributes<HTMLElement> & {
  as?: GlassElement;
  // Real backdrop blur. It is expensive, so only key panels should use it;
  // the rest get a cheaper translucent fill that looks almost the same.
  blur?: boolean;
  // Lift + light-sheen sweep on hover, for cards that lead somewhere.
  interactive?: boolean;
  // Brighter, tinted edge for the featured card of a group.
  featured?: boolean;
};

const GlassPanel: FC<GlassPanelProps> = ({
  as: Element = "div",
  blur = false,
  interactive = false,
  featured = false,
  className = "",
  children,
  ...rest
}) => {
  const classes = [
    "glass",
    blur && "glass--blur",
    interactive && "glass--interactive",
    featured && "glass--featured",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Element className={classes} {...rest}>
      {children}
    </Element>
  );
};

export default GlassPanel;
