"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import Link from "next/link"; // added
import dynamic from "next/dynamic"; // added
import ContactForm from "./components/ContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import GSAPWrapper from "./components/GSAPWrapper";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import BinaryGrid from "./components/BinaryGrid";
import HorizontalScrollText from "./components/HorizontalText";
import projects from "./data/project";


//   {
//     number: "02",
//     title: "Balance of Power",
//     description: "A series of cooperative audio storytelling games",
//     technologies: ["Html", "Css", "Js"],
//     imageSrc: "/images/pob.svg",
//     link: "/projects/powerOfBalance",
//     date: "April 2025",
//   },
//   {
//     number: "02",
//     title: "Bird IP",
//     description: "Your IP address indicates your local bird species",
//     technologies: ["Html", "Css", "Js", "php"],
//     imageSrc: "/images/birdip.svg",
//     link: "/projects/birdIP",
//     date: "April 2025",
//   },
//   {
//     number: "03",
//     title: "National Parks Ecology",
//     description:
//       "A project where admins manage national park info and users can view/save it",
//     technologies: ["Html", "Css", "Js", "php", "mysql"],
//     imageSrc: "/images/npe.svg",
//     link: "/projects/nationalParks",
//     date: "April 2025",
//   },
//   {
//     number: "04",
//     title: "Earth V.S. Mars",
//     description:
//       "A project that explores the differences between Earth and Mars using APIs",
//     technologies: ["pug", "Css", "node", "Js"],
//     imageSrc: "/images/evm.svg",
//     link: "/projects/weather",
//     date: "March 2025",
//   },
//   {
//     number: "05",
//     title: "ANIMATION PROJECT",
//     description: "Joyce's first coding project",
//     technologies: ["Html", "Css", "Js"],
//     imageSrc: "/images/animation.svg",
//     link: "/projects/birdanimation",
//     date: "Nov 2024",
//   },
// ];

export default function Home() {
  // register and run animation on mount
  useEffect(() => {
    gsap.registerPlugin(ScrambleTextPlugin);
    gsap.to(".scramble", {
      duration: 1,
      scrambleText: { text: "Full Stack Developer+Designer" },
    });
  }, []);

  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const allProjects = Object.entries(projects).map(([slug, project]) => ({
    ...project,
    slug,
  }));
  const allTechnologies = [
    ...new Set(allProjects.flatMap((project) => project.technologies)),
  ];
  const filteredProjects = selectedTechnologies.length > 0
    ? allProjects.filter((project) =>
        project.technologies.some((tech) =>
          selectedTechnologies.some(
            (selectedTech) => tech.toLowerCase() === selectedTech.toLowerCase()
          )
        )
      )
    : allProjects;
  return (
    <GSAPWrapper>
      <main>
        <div className=" px-4 ">
          <section className="mx-auto max-w-5xl h-[60vh] mt-24 flex flex-col justify-between">
            <div>
              <div
                id="hero-text"
                className="flex flex-col text-center  justify-between"
              >
                <span className="text-3xl font-semibold text-[var(--foreground)]">
                  Hi, I am Joyce
                </span>
                <br />
                <span className="scramble md:text-7xl text-4xl font-semibold text-[var(--foreground)]">
                  {" "}
                  <span className="animate-[blink_1s_step-end_infinite]">|</span>
                </span>
                <br />
                <br />
              </div>
            </div>
            <BinaryGrid />
            {/* replaced invalid lowercase <link> with Next.js <Link> */}
            {/*  <Link
              href="#projects"
              className=" mx-auto ap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold"
            >
              View My Work
            </Link>*/}
          </section>
          <section>
            <HorizontalScrollText />
          </section>
          <section className=" md:max-w-5xl mx-auto my-24">
          <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x bg-size-[1.4em] md:bg-size-[2em] h-8 pattern-dot-three"></div>
          <h2
            id="projects"
            className="text-[1.6rem] text-center font-semibold text-[var(--foreground)]"
          >{`{ PROJECTS }`}</h2>
          <Tabs defaultValue="">
            <TabsList className="grid md:grid-cols-6  grid-cols-3 gap-4 p-2 rounded-lg relative">
              <TabsTrigger
                value=""
                className=" gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold"
                data-state={
                  selectedTechnologies.length === 0 ? "active" : "inactive"
                }
              >
                All
                {selectedTechnologies.length > 0 && (
                  <>
                    <span className="text-sm text-gray-500">
                      ({selectedTechnologies.length})
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTechnologies([]);
                      }}
                      className="text-[var(--foreground)] bg-[var(--background)] cursor-pointer text-sm ml-2 border-0"
                      title="Clear all filters"
                    >
                      ✕
                    </button>
                  </>
                )}
              </TabsTrigger>
              {allTechnologies.map((tech) => (
                <TabsTrigger
                  key={tech}
                  value={tech}
                  onClick={() => {
                    if (selectedTechnologies.includes(tech)) {
                      setSelectedTechnologies(
                        selectedTechnologies.filter((t) => t !== tech)
                      );
                    } else {
                      setSelectedTechnologies([
                        ...selectedTechnologies,
                        tech,
                      ]);
                    }
                  }}
                  className=" gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg
              hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold"
                  data-state={
                    selectedTechnologies.includes(tech) ? "active" : "inactive"
                  }
                >
                  {tech}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="">
              <div className="grid grid-cols-1 gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.number} 
                    number={project.number}
                    title={project.title}
                    description={project.description}
                    slug={project.slug}
                    technologies={project.technologies}
                    imageSrc={project.images?.[0] || project.videoUrl || ''}
                    link={`/projects/${project.slug}`}
                    date={project.date}
                  />
                ))}
              </div>
            </TabsContent>
            {allTechnologies.map((tech) => (
              <TabsContent key={tech} value={tech}>
                <div className="grid grid-cols-1 gap-4 ">
                  {filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project.number} 
                      number={project.number}
                      title={project.title}
                      description={project.description}
                      slug={project.slug}
                      technologies={project.technologies}
                      imageSrc={project.images?.[0] || project.videoUrl || ''}
                      link={`/projects/${project.slug}`}
                      date={project.date}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          </section>
          <section className="md:max-w-5xl  mx-auto my-24">
          <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x bg-size-[1.4em] md:bg-size-[2em] h-8 pattern-dot-three"></div>

          <h2
            id="contact"
            className="text-[1.6rem] text-center font-semibold text-[var(--foreground)]"
          >{`{ CONTACT }`}</h2>
          <ContactForm />
        
        </section>
        </div>
      </main>
    </GSAPWrapper>
  );
}