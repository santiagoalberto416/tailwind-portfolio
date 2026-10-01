import Head from "next/head";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { FC, useRef } from "react";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import LiquidBackground from "@/components/home/LiquidBackground";
import NavBar from "@/components/home/NavBar";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Stats from "@/components/home/Stats";
import useRevealOnScroll from "@/utils/hooks/useRevealOnScroll";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const pageTitle =
  "Santiago Kirk — Senior Front-End Engineer | Angular · React · TypeScript";
const pageDescription =
  "Santiago Kirk is a Senior Front-End Engineer (Angular · React · TypeScript) building large-scale front ends, design systems and shared component libraries for U.S. product teams. Based in Tijuana, Mexico and open to remote.";

const MainPage: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <div
      ref={rootRef}
      className={`lg-home ${bodyFont.variable} ${displayFont.variable}`}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#070a24" />
      </Head>

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <LiquidBackground />
      <NavBar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
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
