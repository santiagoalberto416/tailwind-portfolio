import Hero3 from "@/components/hero3";
import JobCard from "@/components/jobCard";
import Hero2 from "@/components/hero2";
import { SectionsIds } from "@/components/header";

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

const About = () => {
  return (
    <div
      id={SectionsIds.About}
      className="mx-auto container pt-24 w-100 mt-48 gap-5"
    >
      <div
        style={{ maxWidth: "1000px", height: "fit-content" }}
        className="about-section mx-auto pb-5"
      >
        <Hero3 />
        <JobCard {...JobInfo} />
        <JobCard {...EducationInfo} />
        <Hero2 />
      </div>
    </div>
  );
};

export default About;
