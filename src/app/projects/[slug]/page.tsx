import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";  
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import projects from "../../data/project";

// add a simple PageProps type
type PageProps = { params: { slug: string } };

// helper to support both object- and array-style exports from data/project
function getProjectBySlug(slug: string) {
  if (!projects) return undefined;
  // object keyed by slug
  if ((projects as any)[slug]) return (projects as any)[slug];
  // array of projects with slug property
  if (Array.isArray(projects)) return (projects as any).find((p: any) => p.slug === slug);
  return undefined;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  return {
    title: project?.title || "Project Not Found",
    description: project?.description || "Project details",
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return (
      <div className="max-w-[1000px] mx-auto mt-[100px] p-4">
        <div>
          <h1 className="text-[#67e242] text-center">Project Not Found</h1>
          <Link href="/" className="text-[var(--foreground)] font-semibold no-underline transition-colors duration-300 hover:text-[var(--button)]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-[1000px] mt-[100px] mx-auto w-full">
      <div className="flex items-center justify-center relative">
        <Link href="/" className="absolute left-0 top-4 text-[var(--foreground)] text-2xl no-underline p-4 transition-colors duration-300 hover:text-[var(--button)]">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1 className="text-[#67e242] text-center text-4xl">{project.title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div>
          <div className="flex flex-col gap-8 text-center mx-auto">
            

            {project.videoUrl ? (
              <div className="relative w-full pb-[56.25%] my-8">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                  src={project.videoUrl}
                  title="Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : project.images && project.images.length > 0 ? (
              <div>
                {project.images.map((image: string, index: number) => (
                  <div key={index} className="relative h-64">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="max-w-[500px] w-full h-full object-cover mx-auto"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex gap-4 justify-center">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold"
                >
                  GitHub <FontAwesomeIcon icon={faGithub}/>
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold"
                >
                  Live Demo <FontAwesomeIcon icon={faLaptopCode} />
                </Link>
              )}
            </div>
           
          </div>
        </div>
        <div className="px-12 border-l-2 border-[var(--button)] flex flex-col gap-8 items-stretch justify-center max-md:border-0">
       
          <div>
          <h2 className="text-[#67e242] text-center">About</h2>
          <p style={{ whiteSpace: "pre-line" }} className="text-left">{project.description}</p>
          <h2 className="text-[#67e242] text-center">Technology</h2>
            <div className="flex flex-row gap-4 mt-4 justify-center">
              {project.technologies.map((tech: string, index: number) => (
                <div key={index}>
                  <Image
                    src={`/images/${tech}.svg`}
                    alt={tech}
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[#67e242] text-center">Features</h2>
            <ul className="text-left">
              {project.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {project.members && project.members.length > 0 && (
            <div>
              <h2 className="text-[#67e242] text-center">Member</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                {project.members.map((member: { name: string; url: string }, idx: number) => (
                  <a
                    key={idx}
                    href={member.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-2 px-5 text-[var(--foreground)] border-0 rounded-lg font-medium transition-all duration-200 cursor-pointer hover:bg-[#67e242] hover:text-white"
                  >
                    {member.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div>
        <ContactForm />
      </div> */}
    </main>
  );
}
