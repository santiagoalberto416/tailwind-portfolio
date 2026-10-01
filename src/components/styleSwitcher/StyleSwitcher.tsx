import { FC, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import StyleOptions from "@/components/styleSwitcher/StyleOptions";
import { PortfolioStyleId } from "@/components/styleSwitcher/portfolioStyles";

type StyleSwitcherProps = {
  current: PortfolioStyleId;
  onChange: (style: PortfolioStyleId) => void;
};

const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ps-fab-icon">
    <path
      d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="11.5" r="1.3" fill="currentColor" />
    <circle cx="10" cy="7.5" r="1.3" fill="currentColor" />
    <circle cx="14.5" cy="7.5" r="1.3" fill="currentColor" />
    <circle cx="17" cy="11" r="1.3" fill="currentColor" />
  </svg>
);

// Floating "Change style" button that opens a modal with the three styles.
// Its look adapts to the active style through `data-style`.
const StyleSwitcher: FC<StyleSwitcherProps> = ({ current, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (style: PortfolioStyleId) => {
    setIsOpen(false);
    if (style !== current) onChange(style);
  };

  return (
    <>
      <button
        type="button"
        className="ps-fab"
        data-style={current}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
      >
        <PaletteIcon />
        <span>Change style</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="ps-dialog"
      >
        <DialogBackdrop transition className="ps-dialog-backdrop" />

        <div className="ps-dialog-container">
          <DialogPanel transition className="ps-dialog-panel">
            <div className="ps-dialog-header">
              <div>
                <DialogTitle className="ps-dialog-title">
                  Choose a style
                </DialogTitle>
                <p className="ps-dialog-lead">
                  Same portfolio, three different designs.
                </p>
              </div>
              <button
                type="button"
                className="ps-dialog-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close style picker"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <StyleOptions
              onSelect={handleSelect}
              current={current}
              size="compact"
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default StyleSwitcher;
