import Header from "@/components/header";
import Head from "next/head";
import Content from "@/components/content";
import { FC, useEffect } from "react";
import Experience from "@/components/experience";
import About from "@/components/about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

const MainPage: FC<{}> = () => {
  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".hidden-section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show-section");
        } else {
          entry.target.classList.remove("show-section");
        }
      });
    });
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="root">
      <Head>
        <title>Santiago Kirk Portfolio</title>
        <meta
          name="description"
          content="This is a personal portafolio of Santiago Kirk a Front End React Developer "
          key="desc"
        />
      </Head>
      <Header />
      <Content />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default MainPage;
