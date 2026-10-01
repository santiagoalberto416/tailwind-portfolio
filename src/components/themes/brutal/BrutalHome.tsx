import { FC, useRef } from "react";
import Head from "next/head";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import useReveal from "@/components/themes/brutal/useReveal";
import NavBar from "@/components/themes/brutal/NavBar";
import Hero from "@/components/themes/brutal/Hero";
import Marquee from "@/components/themes/brutal/Marquee";
import About from "@/components/themes/brutal/About";
import Stats from "@/components/themes/brutal/Stats";
import Skills from "@/components/themes/brutal/Skills";
import Experience from "@/components/themes/brutal/Experience";
import Projects from "@/components/themes/brutal/Projects";
import Contact from "@/components/themes/brutal/Contact";
import Footer from "@/components/themes/brutal/Footer";

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

const BrutalHome: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div
      ref={rootRef}
      className={`nb ${displayFont.variable} ${monoFont.variable} min-h-screen`}
    >
      <Head>
        <meta name="theme-color" content="#FFF8E7" key="theme-color" />
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

export default BrutalHome;
