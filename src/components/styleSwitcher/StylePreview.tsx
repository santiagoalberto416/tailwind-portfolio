import { FC } from "react";
import { PortfolioStyleId } from "@/components/styleSwitcher/portfolioStyles";

// Small decorative mock-ups of each style, drawn with plain elements and CSS
// (see .ps-preview-* in styles/themes/_switcher.scss).

const BentoPreview = () => (
  <div className="ps-preview ps-preview-bento">
    <div className="ps-bento-grid">
      <div className="ps-bento-tile ps-bento-intro">
        <span className="ps-bento-dot" />
        <span className="ps-bar ps-bar-lg" />
        <span className="ps-bar ps-bar-md" />
        <span className="ps-bento-cta" />
      </div>
      <div className="ps-bento-tile ps-bento-photo" />
      <div className="ps-bento-tile ps-bento-stat">
        <span className="ps-bento-number">10+</span>
      </div>
      <div className="ps-bento-tile ps-bento-wide">
        <span className="ps-bar ps-bar-sm" />
        <span className="ps-bar ps-bar-xs" />
      </div>
      <div className="ps-bento-tile ps-bento-stat">
        <span className="ps-bento-number">90+</span>
      </div>
    </div>
  </div>
);

const GlassPreview = () => (
  <div className="ps-preview ps-preview-glass">
    <span className="ps-glass-blob ps-glass-blob-a" />
    <span className="ps-glass-blob ps-glass-blob-b" />
    <span className="ps-glass-blob ps-glass-blob-c" />
    <div className="ps-glass-nav">
      <span />
      <span />
      <span />
    </div>
    <div className="ps-glass-card">
      <div className="ps-glass-text">
        <span className="ps-bar ps-bar-lg" />
        <span className="ps-bar ps-bar-md" />
        <span className="ps-glass-button" />
      </div>
      <span className="ps-glass-avatar" />
    </div>
  </div>
);

const BrutalPreview = () => (
  <div className="ps-preview ps-preview-brutal">
    <div className="ps-brutal-nav">
      <span className="ps-brutal-logo" />
      <span className="ps-brutal-button" />
    </div>
    <div className="ps-brutal-body">
      <div className="ps-brutal-type">
        <span className="ps-brutal-line" />
        <span className="ps-brutal-line ps-brutal-highlight" />
        <span className="ps-brutal-line ps-brutal-short" />
      </div>
      <div className="ps-brutal-photo">
        <span className="ps-brutal-sticker" />
      </div>
    </div>
    <div className="ps-brutal-marquee" />
  </div>
);

const previews: Record<PortfolioStyleId, FC> = {
  bento: BentoPreview,
  glass: GlassPreview,
  brutal: BrutalPreview,
};

const StylePreview: FC<{ style: PortfolioStyleId }> = ({ style }) => {
  const Preview = previews[style];
  return (
    <div aria-hidden="true">
      <Preview />
    </div>
  );
};

export default StylePreview;
