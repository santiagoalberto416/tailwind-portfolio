import { useCallback, useEffect, useState } from "react";
import {
  isPortfolioStyleId,
  PortfolioStyleId,
  STYLE_QUERY_PARAM,
  STYLE_STORAGE_KEY,
} from "@/components/styleSwitcher/portfolioStyles";

const readStoredStyle = (): PortfolioStyleId | null => {
  try {
    const stored = window.localStorage.getItem(STYLE_STORAGE_KEY);
    return isPortfolioStyleId(stored) ? stored : null;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies…)
    return null;
  }
};

const storeStyle = (style: PortfolioStyleId) => {
  try {
    window.localStorage.setItem(STYLE_STORAGE_KEY, style);
  } catch {
    // The choice just won't be remembered next time
  }
};

const removeStyleQueryParam = () => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(STYLE_QUERY_PARAM)) return;
  url.searchParams.delete(STYLE_QUERY_PARAM);
  window.history.replaceState(window.history.state, "", url);
};

// Which home page style to show. `null` means the visitor hasn't picked one
// yet (or the saved choice hasn't been read yet: the static HTML always starts
// without a style), so the style picker is shown.
const usePortfolioStyle = () => {
  const [style, setStyle] = useState<PortfolioStyleId | null>(null);

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get(
      STYLE_QUERY_PARAM
    );

    if (isPortfolioStyleId(fromQuery)) {
      storeStyle(fromQuery);
      setStyle(fromQuery);
    } else {
      setStyle(readStoredStyle());
    }
  }, []);

  const chooseStyle = useCallback((next: PortfolioStyleId) => {
    storeStyle(next);
    // The saved choice wins from now on, so drop a ?style= link parameter
    removeStyleQueryParam();
    document.documentElement.setAttribute("data-portfolio-style", next);
    setStyle(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return { style, chooseStyle };
};

export default usePortfolioStyle;
