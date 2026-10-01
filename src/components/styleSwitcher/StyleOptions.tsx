import { FC } from "react";
import StylePreview from "@/components/styleSwitcher/StylePreview";
import {
  PortfolioStyleId,
  portfolioStyles,
} from "@/components/styleSwitcher/portfolioStyles";

type StyleOptionsProps = {
  onSelect: (style: PortfolioStyleId) => void;
  current?: PortfolioStyleId | null;
  // "large" on the landing picker, "compact" inside the modal
  size?: "large" | "compact";
};

// The three selectable style cards, shared by the landing picker and the
// "Change style" modal.
const StyleOptions: FC<StyleOptionsProps> = ({
  onSelect,
  current = null,
  size = "large",
}) => (
  <ul className={`ps-options ps-options-${size}`}>
    {portfolioStyles.map((style) => {
      const isCurrent = style.id === current;

      return (
        <li key={style.id}>
          <button
            type="button"
            className="ps-option"
            onClick={() => onSelect(style.id)}
            aria-pressed={current ? isCurrent : undefined}
            aria-describedby={`ps-option-${size}-${style.id}`}
          >
            <StylePreview style={style.id} />
            <span className="ps-option-body">
              <span className="ps-option-heading">
                <span className="ps-option-name">{style.name}</span>
                {isCurrent && <span className="ps-option-badge">Current</span>}
              </span>
              <span className="ps-option-tagline">{style.tagline}</span>
              <span
                id={`ps-option-${size}-${style.id}`}
                className="ps-option-description"
              >
                {style.description}
              </span>
              {size === "large" && (
                <span className="ps-option-cta">
                  View portfolio
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </span>
          </button>
        </li>
      );
    })}
  </ul>
);

export default StyleOptions;
