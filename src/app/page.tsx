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
        // Corrected GROQ query with fix for the date fallback
        const data = await client.fetch(`*[_type == "project"] | order(displaydate desc) {
          title,
          "slug": slug.current,
          description,
          technologies,
          "imageSrc": mainImage.asset->url,
          githubUrl,
          liveDemoUrl,
          displaydate
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
      duration: 1.5,
      scrambleText: { 
        text: "Full Stack Developer + Designer",
        chars: "01",
        revealDelay: 0.5 
      },
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
          <section className="mx-auto max-w-5xl min-h-[60vh] mt-24 flex flex-col justify-between">
            <div id="hero-text" className="flex flex-col text-center">
              <span className="text-4xl font-semibold text-[var(--foreground)]">
                Hi, I am Joyce
              </span>
              <div className="h-20 flex items-center justify-center">
                <span className="scramble md:text-7xl text-4xl font-semibold text-[var(--foreground)]">
                  {" "}<span className="animate-[blink_1s_step-end_infinite]">|</span>
                </span>
              </div>
            </div>
            <div className="w-full py-12">
              <BinaryGrid />
            </div>
          </section>

          {/* Marquee Section */}
          <section>
            <HorizontalScrollText />
          </section>

          {/* Projects Section */}
          <section className="md:max-w-5xl mx-auto my-24">
            <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three opacity-30"></div>
            
            <h2 id="projects" className="text-[1.6rem] text-center font-semibold text-[var(--foreground)] mb-8">
              {`{ PROJECTS }`}
            </h2>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid md:grid-cols-6 grid-cols-3 gap-4 p-2 mb-12">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedTechnologies([])}
                  className={`gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg transition-all font-bold 
                    ${selectedTechnologies.length === 0 ? "bg-[var(--retro-primary)] text-[var(--retro-bg)]" : "text-[var(--retro-primary)]"}`}
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
                      ${selectedTechnologies.includes(tech) ? "bg-[var(--retro-primary)] text-[var(--retro-bg)]" : "text-[var(--retro-primary)]"}`}
                  >
                    {tech}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-4 focus:outline-none">
                <div className="grid grid-cols-1 gap-12">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      title={project.title}
                      description={project.description}
                      slug={project.slug}
                      technologies={project.technologies}
                      imageSrc={project.imageSrc}
                      githubUrl={project.githubUrl}
                      liveDemoUrl={project.liveDemoUrl}
                      link={`/projects/${project.slug}`}
                      // Pass the resolved date (either the date string or "Ongoing")
                      displaydate={project.displaydate}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Contact Section */}
          <section className="md:max-w-5xl mx-auto my-24">
            <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three opacity-30"></div>
            <h2 id="contact" className="text-[1.6rem] text-center font-semibold text-[var(--foreground)] mb-8">
              {`{ CONTACT }`}
            </h2>
            <ContactForm />
          </section>
        </div>
      </main>
    </GSAPWrapper>
  );
}