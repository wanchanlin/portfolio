"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import GSAPWrapper from "./components/GSAPWrapper";
import Timeline from "./components/Timeline";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react"; 
import BinaryGrid from "./components/BinaryGrid";
import HorizontalScrollText from "./components/HorizontalText";
import { client } from "../sanity/lib/client";
// import { sanityFetch } from "../sanity/lib/live";

// Register outside the component
gsap.registerPlugin(ScrambleTextPlugin);

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef(null);

  // 1. Fetch Projects
  useEffect(() => {
    async function fetchProjects() {
      try {
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
  }, []);

  // 2. Filter Logic (Memoized)
  const allTechnologies = useMemo(() => {
    return [...new Set(projects.flatMap((p) => p.technologies || []))].sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTechnologies.length === 0) return projects;
    return projects.filter((project) =>
      project.technologies?.some((tech: string) => selectedTechnologies.includes(tech))
    );
  }, [projects, selectedTechnologies]);

  // 3. GSAP Animation Logic
  useGSAP(() => {
    if (!loading) {
      gsap.to(".scramble", {
        duration: 1.5,
        scrambleText: {
          text: "Full Stack Developer + Designer",
          chars: "01",
          revealDelay: 0.5,
        },
        ease: "power3.out",
      });
    }
  }, { scope: container, dependencies: [loading] });

  // 4. Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--background)]">
        <span className="text-xl font-mono animate-pulse text-[var(--retro-primary)]">
          &gt; LOADING_DATA...
        </span>
      </div>
    );
  }

  // 5. Main Render
  return (
    <GSAPWrapper>
      <main ref={container} className="px-4">
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl min-h-[60vh] mt-24 flex flex-col justify-between">
          <div id="hero-text" className="flex flex-col text-center">
            <span className="text-4xl font-semibold text-[var(--foreground)]">
              Hi, I am Joyce
            </span>
            <div className="mt-4 flex items-center justify-center">
              <span className="scramble lg:text-4xl md:text-3xl text-2xl p-4 font-semibold text-black border-2 border-[var(--retro-primary)] bg-yellow-200 drop-shadow-[4px_4px_0px_var(--foreground)]">
                |
              </span>
            </div>
          </div>
          <div className="w-full">
            <BinaryGrid />
          </div>
        </section>

        <section>
          <HorizontalScrollText />
        </section>

        {/* Projects Section */}
        <section id="projects" className="md:max-w-5xl mx-auto my-24">
          <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three opacity-30"></div>
          
          <h2 className="text-[1.6rem] text-center font-semibold text-[var(--foreground)] mb-8">
            {`{ PROJECTS }`}
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 p-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedTechnologies([])}
              className={`px-6 py-2 rounded-pixel-lg border-2 border-[var(--retro-primary)] transition-all font-bold 
                ${selectedTechnologies.length === 0 
                  ? "bg-[var(--retro-primary)] text-[var(--retro-bg)]" 
                  : "text-[var(--retro-primary)] hover:bg-[var(--retro-primary)]/10"
                }`}
            >
              All ({projects.length})
            </button>

            {allTechnologies.map((tech) => {
              const isSelected = selectedTechnologies.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => {
                    setSelectedTechnologies((prev) =>
                      isSelected ? prev.filter((t) => t !== tech) : [...prev, tech]
                    );
                  }}
                  className={`px-4 py-2 rounded-pixel-lg border-2 border-[var(--retro-primary)] transition-all font-bold 
                    ${isSelected 
                      ? "bg-[var(--retro-primary)] text-[var(--retro-bg)] shadow-[4px_4px_0px_var(--foreground)]" 
                      : "text-[var(--retro-primary)] hover:bg-[var(--retro-primary)]/10"
                    }`}
                >
                  {tech}
                  {isSelected && <span className="ml-2 text-xs">×</span>}
                </button>
              );
            })}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 gap-12 min-h-[400px]">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  number={(index + 1).toString().padStart(2, '0')}
                  {...project}
                  link={`/projects/${project.slug}`}
                />
              ))
            ) : (
              <div className="text-center py-20 opacity-50 font-mono">
                &gt; NO_MATCHING_PROJECTS_FOUND
              </div>
            )}
          </div>
        </section>

        {/* Experience Timeline Section */}
        {/* <section id="experience" className="md:max-w-5xl mx-auto my-24">
          <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three opacity-30"></div>
          <h2 className="text-[1.6rem] text-center font-semibold text-[var(--foreground)] mb-8">
            {`{ EXPERIENCE }`}
          </h2>
          
          <Timeline 
            items={[
              {
                id: '1',
                title: 'Full Stack Developer',
                company: 'Tech Company',
                period: '2022 - Present',
                type: 'work',
                description: [
                  'Developed and maintained web applications using React and Next.js',
                  'Implemented responsive designs and optimized user experiences',
                  'Collaborated with cross-functional teams to deliver projects'
                ],
                technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
              },
              {
                id: '2',
                title: 'Frontend Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                type: 'work',
                description: [
                  'Created modern, responsive websites for various clients',
                  'Worked closely with designers to implement pixel-perfect layouts',
                  'Optimized websites for performance and SEO'
                ],
                technologies: ['JavaScript', 'Vue.js', 'SASS', 'WordPress']
              },
              {
                id: '3',
                title: 'Computer Science Degree',
                company: 'University Name',
                period: '2016 - 2020',
                type: 'education',
                description: [
                  'Bachelor of Science in Computer Science',
                  'Focused on software engineering and web development',
                  'Graduated with honors'
                ],
                technologies: ['Java', 'Python', 'Data Structures', 'Algorithms']
              }
            ]}
          />
        </section> */}

        {/* Contact Section */}
        <section id="contact" className="md:max-w-5xl mx-auto my-24">
          <div className="my-12 w-full bg-size-[0.7em] h-4 bg-repeat-x pattern-dot-three opacity-30"></div>
          <h2 className="text-[1.6rem] text-center font-semibold text-[var(--foreground)] mb-8">
            {`{ CONTACT }`}
          </h2>
          <ContactForm />
        </section>
      </main>
    </GSAPWrapper>
  );
}