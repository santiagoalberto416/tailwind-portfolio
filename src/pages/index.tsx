import { FC, useRef } from "react";
import Head from "next/head";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import useReveal from "@/utils/hooks/useReveal";
import NavBar from "@/components/home/navBar";
import Hero from "@/components/home/hero";
import Marquee from "@/components/home/marquee";
import About from "@/components/home/about";
import Stats from "@/components/home/stats";
import Skills from "@/components/home/skills";
import Experience from "@/components/home/experience";
import Projects from "@/components/home/projects";
import Contact from "@/components/home/contact";
import Footer from "@/components/home/footer";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const pageTitle = `${profile.shortName} | ${profile.role} | ${profile.focus.join(" · ")}`;
const pageDescription = `${profile.role} (${profile.focus.join(" · ")}) based in ${profile.location}. ${profile.availability}. ${profile.headline}`;

const MainPage: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div
      ref={rootRef}
      className={`nb ${displayFont.variable} ${monoFont.variable} min-h-screen`}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#FFF8E7" />
      </Head>

      <a href="#main-content" className="nb-skip">
        Skip to main content
      </a>
      <NavBar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
