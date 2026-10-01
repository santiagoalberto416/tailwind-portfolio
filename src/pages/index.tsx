import { useRef } from "react";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/home/NavBar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import { profile } from "@/data/profile";
import useRevealOnScroll from "@/utils/hooks/useRevealOnScroll";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const pageTitle = `${profile.shortName} — ${profile.role} | ${profile.focus.join(" · ")}`;
const pageDescription = `${profile.name}, ${profile.role} (${profile.focus.join(" · ")}). ${profile.headline}`;

const MainPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <div
      ref={rootRef}
      className={`bento-home ${geistSans.variable} ${geistMono.variable}`}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc" />
        <meta name="theme-color" content="#0a0a0b" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
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

export default MainPage;
