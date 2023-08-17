import Header from "@/components/header";
import Head from "next/head";
import Content from "@/components/content";
import { FC, useEffect } from "react";
import Hero2 from "@/components/hero2";

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
    <div className="h-screen">
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
      <Hero2 />
    </div>
  );
};

export default MainPage;
