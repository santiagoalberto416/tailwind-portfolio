import Header from "@/components/header";
import Head from "next/head";
import Content from "@/components/content";
import { FC, useEffect } from "react";
import Hero2 from "@/components/hero2";
import JobCard from "@/components/jobCard";
import Hero3 from "@/components/hero3";

// job card info
const JobInfo = {
  title: "Current Job",
  description: (
    <>
      I&apos;m currently working at{" "}
      <a
        href="https://www.arkusnexus.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary link-style"
      >
        ArkusNexus
      </a>
      . I&apos;m a Front End Developer working with React, TypeScript, and
      GraphQL.
    </>
  ),
  image: "/arkus-background-image.jpg",
  icon: "/arkus-nexus-icon.png",
};

const EducationInfo = {
  title: "My Education",
  description: (
    <>
      I have a Bachelor&apos;s degree in Computer Science from the{" "}
      <a
        href="https://uttijuana.edu.mx/"
        target="_blank"
        rel="noopener noreferrer"
        className="link-style"
      >
        Universidad Tecnológica de Tijuana UTT
      </a>
    </>
  ),
  image: "/utt-background-image.png",
  icon: "/utt-icon.png",
};

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
      <div className="mx-auto container w-100 mt-48 gap-5">
        <div
          style={{ maxWidth: "1000px" }}
          className="about-section mx-auto pb-10 "
        >
          <Hero3 />
          <JobCard {...JobInfo} />
          <JobCard {...EducationInfo} />
          <Hero2 />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
