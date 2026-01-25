"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import GSAPWrapper from "./components/GSAPWrapper";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import BinaryGrid from "./components/BinaryGrid";
import HorizontalScrollText from "./components/HorizontalText";
import { client } from "../sanity/lib/client";

export default function Home() {
  // --- 1. State Management ---
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 2. Data Fetching & Animations ---
  useEffect(() => {
    async function fetchProjects() {
      try {
        // Fetching from Sanity and transforming fields for the UI
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
          title,
          "slug": slug.current,
          description,
          technologies,
          "imageSrc": mainImage.asset->url,
          githubUrl,
          liveDemoUrl,
          "date": _createdAt
        }`);
        setProjects(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    // GSAP Scramble Animation
    gsap.registerPlugin(ScrambleTextPlugin);
    gsap.to(".scramble", {
      duration: 1,
      scrambleText: { text: "Full Stack Developer+Designer" },
    });
  }, []);

  // --- 3. Filtering Logic ---
  const allTechnologies = [
    ...new Set(projects.flatMap((project) => project.technologies || [])),
  ];

  const filteredProjects = selectedTechnologies.length > 0
    ? projects.filter((project) =>
        project.technologies?.some((tech: string) =>
          selectedTechnologies.some(
            (selectedTech) => tech.toLowerCase() === selectedTech.toLowerCase()
          )
        )
      )
    : projects;

  // --- 4. Render Loading State ---
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--background)]">
        <span className="text-xl font-mono animate-pulse text-[var(--retro-primary)]">
          &gt; LOADING_DATA...
        </span>
      </div>
    );
  }

  return (
    <GSAPWrapper>
      <main>
        <div className="px-4">
          {/* Hero Section */}
          <section className="mx-auto max-w-5xl h-[60vh] mt-24 flex flex-col justify-between">
            <div id="hero-text" className="flex flex-col text-center justify-between">
              <span className="text-4xl font-semibold text-[var(--foreground)]">
                Hi, I am Joyce
              </span>
              <br />
              <span className="scramble md:text-7xl text-4xl font-semibold text-[var(--foreground)]">
                {" "}<span className="animate-[blink_1s_step-end_infinite]">|</span>
              </span>
            </div>
            <BinaryGrid />
          </section>

          {/* Marquee Section */}
          <section>
            <HorizontalScrollText />
          </section>

          {/* Projects Section */}
          <section className="md:max-w-5xl mx-auto my-24">
            <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three"></div>
            
            <h2 id="projects" className="text-[1.6rem] text-center font-semibold text-[var(--foreground)] mb-8">
              {`{ PROJECTS }`}
            </h2>

            <Tabs defaultValue="all">
              <TabsList className="grid md:grid-cols-6 grid-cols-3 gap-4 p-2 mb-12">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedTechnologies([])}
                  className={`gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg transition-all font-bold 
                    ${selectedTechnologies.length === 0 ? "bg-[var(--retro-primary)] text-[var(--retro-bg)]" : ""}`}
                >
                  All ({projects.length})
                </TabsTrigger>

                {allTechnologies.map((tech) => (
                  <TabsTrigger
                    key={tech}
                    value={tech}
                    onClick={() => {
                      setSelectedTechnologies((prev) =>
                        prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
                      );
                    }}
                    className={`gap-2 flex items-center border-2 border-[var(--retro-primary)] px-4 py-2 rounded-pixel-lg transition-all font-bold
                      ${selectedTechnologies.includes(tech) ? "bg-[var(--retro-primary)] text-[var(--retro-bg)]" : ""}`}
                  >
                    {tech}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-1 gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.slug}
                      number={index + 1}
                      title={project.title}
                      description={project.description}
                      slug={project.slug}
                      technologies={project.technologies}
                      imageSrc={project.imageSrc}
                      link={`/projects/${project.slug}`}
                      date={new Date(project.date).toLocaleDateString()}
                    />
                  ))}
                </div>
              </TabsContent>
              
              {/* If you select a specific tab, the 'all' content above updates because 
                  it uses 'filteredProjects'. No need to duplicate TabsContent for every tech. */}
            </Tabs>
          </section>

          {/* Contact Section */}
          <section className="md:max-w-5xl mx-auto my-24">
            <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three"></div>
            <h2 id="contact" className="text-[1.6rem] text-center font-semibold text-[var(--foreground)]">
              {`{ CONTACT }`}
            </h2>
            <ContactForm />
          </section>
        </div>
      </main>
    </GSAPWrapper>
  );
}