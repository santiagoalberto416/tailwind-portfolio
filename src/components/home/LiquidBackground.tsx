import { FC } from "react";

// Fixed, slowly drifting mesh gradient behind the whole page. Blobs are radial
// gradients (no CSS filter) and only their transform is animated, so it stays
// cheap to render. The animation pauses under prefers-reduced-motion.
const LiquidBackground: FC = () => (
  <div className="liquid-bg" aria-hidden="true">
    <span className="liquid-blob liquid-blob--aqua" />
    <span className="liquid-blob liquid-blob--violet" />
    <span className="liquid-blob liquid-blob--coral" />
    <span className="liquid-blob liquid-blob--blue" />
    <span className="liquid-blob liquid-blob--peach" />
    <span className="liquid-grain" />
  </div>
);

export default LiquidBackground;
