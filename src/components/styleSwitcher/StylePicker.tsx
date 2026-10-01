import { FC } from "react";
import StyleOptions from "@/components/styleSwitcher/StyleOptions";
import { PortfolioStyleId } from "@/components/styleSwitcher/portfolioStyles";
import { profile } from "@/data/profile";

// Full-screen landing shown to first-time visitors: pick one of the three
// styles to enter the portfolio.
const StylePicker: FC<{ onSelect: (style: PortfolioStyleId) => void }> = ({
  onSelect,
}) => (
  <div className="ps-landing">
    <div className="ps-landing-glow" aria-hidden="true" />

    <main className="ps-landing-inner">
      <header className="ps-landing-header">
        <p className="ps-landing-identity">
          <span className="ps-landing-avatar" aria-hidden="true">
            SK
          </span>
          <span>
            <span className="ps-landing-name">{profile.shortName}</span>
            <span className="ps-landing-role">
              {profile.role} · {profile.focus.join(" · ")}
            </span>
          </span>
        </p>

        <h1 className="ps-landing-title">
          Pick how you&apos;d like to see my portfolio.
        </h1>
        <p className="ps-landing-lead">
          Same content, three of 2026&apos;s web design trends. Choose one to
          start. You can switch anytime from the button at the bottom of the
          page.
        </p>
      </header>

      <StyleOptions onSelect={onSelect} size="large" />

      <p className="ps-landing-note">
        Your choice is remembered on this device.
      </p>
    </main>
  </div>
);

export default StylePicker;
