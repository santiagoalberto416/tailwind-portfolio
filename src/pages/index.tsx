import { FC } from "react";
import Head from "next/head";
import BentoHome from "@/components/themes/bento/BentoHome";
import GlassHome from "@/components/themes/glass/GlassHome";
import BrutalHome from "@/components/themes/brutal/BrutalHome";
import StylePicker from "@/components/styleSwitcher/StylePicker";
import StyleSwitcher from "@/components/styleSwitcher/StyleSwitcher";
import usePortfolioStyle from "@/components/styleSwitcher/usePortfolioStyle";
import { PortfolioStyleId } from "@/components/styleSwitcher/portfolioStyles";
import { profile } from "@/data/profile";

const themes: Record<PortfolioStyleId, FC> = {
  bento: BentoHome,
  glass: GlassHome,
  brutal: BrutalHome,
};

const pageTitle = `${profile.shortName} — ${profile.role} | ${profile.focus.join(" · ")}`;
const pageDescription = `${profile.shortName} is a ${profile.role} (${profile.focus.join(" · ")}) based in ${profile.location}. ${profile.headline}`;

const MainPage: FC = () => {
  const { style, chooseStyle } = usePortfolioStyle();
  const Theme = style ? themes[style] : null;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Head>

      {Theme && style ? (
        <>
          <Theme key={style} />
          <StyleSwitcher current={style} onChange={chooseStyle} />
        </>
      ) : (
        <StylePicker onSelect={chooseStyle} />
      )}
    </>
  );
};

export default MainPage;
