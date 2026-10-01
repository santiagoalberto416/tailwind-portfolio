import Head from "next/head";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { FC, useRef } from "react";
import About from "@/components/themes/glass/About";
import Contact from "@/components/themes/glass/Contact";
import Experience from "@/components/themes/glass/Experience";
import Footer from "@/components/themes/glass/Footer";
import Hero from "@/components/themes/glass/Hero";
import LiquidBackground from "@/components/themes/glass/LiquidBackground";
import NavBar from "@/components/themes/glass/NavBar";
import Projects from "@/components/themes/glass/Projects";
import Skills from "@/components/themes/glass/Skills";
import Stats from "@/components/themes/glass/Stats";
import useRevealOnScroll from "@/components/themes/glass/useRevealOnScroll";

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

const GlassHome: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <div
      ref={rootRef}
      className={`lg-home ${bodyFont.variable} ${displayFont.variable}`}
    >
      <Head>
        <meta name="theme-color" content="#070a24" key="theme-color" />
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

export default GlassHome;
