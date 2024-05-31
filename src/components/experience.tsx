import { SectionsIds } from "@/components/header";
import { useState } from "react";

type WorkExperience = {
  year: number;
  project: string;
  position: string;
  company: string;
  techStack: string[];
  link: string;
  description: string;
};

const description = `
  Mainly my entire career has been with an outsourcing company, so I have been working in a lot of projects with different technologies and different teams.
  and for different clients, so I have been able to learn a lot of things in a short period of time.
`;

const experiences: WorkExperience[] = [
  {
    year: 2016,
    project: "Arkus Bootcamp",
    company: "ArkusNexus",
    position: "Internship",
    techStack: ["Android", "Git", "Scrum", "Java"],
    link: "",
    description:
      "This was my introduction to the company and the technologies I would be using. I had mentors who taught me how to use the technologies and best practices. We formed teams to simulate real-world scenarios and worked on projects evaluated by mentors.",
  },
  {
    year: 2017,
    project: "Spark Compass (various projects)",
    position: "Jr developer",
    company: "Spark Compass",
    techStack: ["Java", "Swift", "Native Android", "Native iOS"],
    link: "",
    description:
      "A startup focused on developing mobile applications for large corporations. Here, I gained extensive knowledge in mobile development and learned about device capabilities, utilizing them to enhance user experience.",
  },
  {
    year: 2019,
    project: "J5 and Jitterbug (OS system for older people)",
    position: "Mid developer",
    company: "Great Call",
    techStack: ["Native Android"],
    link: "",
    description:
      "This was a very interesting project; it involved creating an operating system tailored for older users. All basic applications such as camera, phone, contacts, messages, etc., were customized and optimized with larger UI elements for easier use by older individuals. Here, I learned how base operating systems function and how to access various device data.",
  },
  {
    year: 2021,
    project: "Ambry Hill (various projects)",
    position: "Mid front end developer",
    company: "Ambry Hill",
    techStack: ["React", "Redux", "Node.js", "TypeScript", "GraphQL"],
    link: "https://ambryhill.com/",
    description:
      "The primary focus of this company was buying and selling airplane parts, necessitating the development of a dedicated system. This marked my introduction to web development. I applied various framework technologies to complete this project and gained valuable insights into the industry.",
  },
  {
    year: 2022,
    project: "CTO.ai (various projects)",
    position: "Mid/Sr front end developer",
    company: "CTO.ai",
    link: "https://cto.ai/",
    techStack: ["React", "Next.js", "Github Actions", "TypeScript"],
    description:
      "My main role here was a front end developer, working with React, Next.js, and TypeScript. I was also involved in the development/maintenance of the CLI.",
  },
];

const MobileExperience = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  return (
    <div className="lg:hidden block container mx-auto px-20 experience text">
      <h1 className="text-4xl text-white text-center mb-10">Experience</h1>
      <p className="max-w-3xl text-center mx-auto text-white mb-10">
        {description}
      </p>
      <div className="w-full overflow-x-auto">
        <div className="table-view">{/* Your existing table code */}</div>
        <div className="card-view">
          {experiences.map((experience, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <h2>{experience.year}</h2>
                <div>
                  <h3>{experience.project}</h3>
                  <h4>{experience.company}</h4>
                </div>
                <div className="grow flex justify-end">
                  <button onClick={() => handleExpand(index)}>
                    <span>
                      {expandedIndex === index ? (
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 1024 1024"
                          className="icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 192l448 512H64z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 1024 1024"
                          className="icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 768l448-512H64z" fill="currentColor" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              </div>
              {expandedIndex === index && (
                <div className="card-body">
                  <p>{experience.position}</p>
                  <p>{experience.techStack.join(", ")}</p>
                  <p>{experience.description}</p>
                  {experience.link && (
                    <a href={experience.link} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const DesktopExperience = () => {
  return (
    <div className="lg:block hidden container mx-auto px-20 experience text">
      <h1 className="text-4xl text-white text-center mb-10">Experience</h1>
      <p className="max-w-3xl text-center mx-auto text-white mb-10">
        {description}
      </p>
      <div className="w-full overflow-x-auto">
        <table className="mx-auto rounded-lg overflow-x-clip overflow-y-clip">
          <thead>
            <tr>
              <th>Year</th>
              <th>Project</th>
              <th>Position</th>
              <th>Company</th>
              <th className="max-w-40">Tech Stack</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience, index) => (
              <tr key={index}>
                <td>{experience.year}</td>
                <td>{experience.project}</td>
                <td>{experience.position}</td>
                <td>{experience.company}</td>
                <td>
                  {experience.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </td>
                <td>
                  {experience.link ? (
                    <a href={experience.link} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <div id={SectionsIds.Experience}>
      <MobileExperience />
      <DesktopExperience />
    </div>
  );
};

export default Experience;
