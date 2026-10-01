import { CSSProperties, ElementType, HTMLAttributes, MouseEvent, ReactNode } from "react";

// Feeds the cursor position to the card's CSS (--x / --y) so the radial
// spotlight in `.bento-card` follows the pointer.
export const trackSpotlight = (event: MouseEvent<HTMLElement>) => {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

type BentoCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  // Opt in/out of the scroll-reveal animation and its stagger delay (ms).
  reveal?: boolean;
  revealDelay?: number;
};

const BentoCard = ({
  as: Component = "div",
  children,
  className = "",
  reveal = true,
  revealDelay = 0,
  style,
  ...rest
}: BentoCardProps) => (
  <Component
    data-reveal={reveal ? "" : undefined}
    onMouseMove={trackSpotlight}
    className={`bento-card ${className}`}
    style={{ ...style, "--reveal-delay": `${revealDelay}ms` } as CSSProperties}
    {...rest}
  >
    {children}
  </Component>
);

export default BentoCard;
