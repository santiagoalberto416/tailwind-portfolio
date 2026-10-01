import { useRef } from "react";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/themes/bento/NavBar";
import Hero from "@/components/themes/bento/Hero";
import Stats from "@/components/themes/bento/Stats";
import About from "@/components/themes/bento/About";
import Skills from "@/components/themes/bento/Skills";
import Experience from "@/components/themes/bento/Experience";
import Projects from "@/components/themes/bento/Projects";
import Contact from "@/components/themes/bento/Contact";
import Footer from "@/components/themes/bento/Footer";
import useRevealOnScroll from "@/components/themes/bento/useRevealOnScroll";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const BentoHome = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <div
      ref={rootRef}
      className={`bento-home ${geistSans.variable} ${geistMono.variable}`}
    >
      <Head>
        <meta name="theme-color" content="#0a0a0b" key="theme-color" />
      </Head>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[999px] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to main content
      </a>

      <div className="bento-backdrop" aria-hidden="true" />
      <div className="bento-grain" aria-hidden="true" />

      <NavBar />

      <main id="main-content" className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default BentoHome;
