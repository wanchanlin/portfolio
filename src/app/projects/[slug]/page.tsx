import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { client } from "../../../sanity/lib/client";

// Update PageProps to handle async params (Next.js 15 requirement)
type PageProps = { params: Promise<{ slug: string }> };

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    technologies,
    "images": gallery[].asset->url,
    features,
    "demo": liveDemoUrl,
    "github": githubUrl,
    videoUrl,
    members
  }`;
  // Revalidate ensures your page updates after you edit content in Sanity
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await params
  const project = await getProject(slug);
  return {
    title: project?.title ? `${project.title} | Portfolio` : "Project Not Found",
    description: project?.description || "Project details",
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params; // Await params
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="max-w-[1000px] mx-auto mt-[100px] p-4 text-center">
        <h1 className="text-[#67e242] text-2xl mb-4">Project Not Found</h1>
        <Link href="/" className="text-[var(--foreground)] font-semibold border-b border-[#67e242] pb-1 hover:text-[#67e242] transition-colors">
          &larr; Return to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-[1000px] mt-[100px] mx-auto w-full px-4 mb-20">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-12">
        <Link 
          href="/" 
          className="absolute left-0 text-[var(--foreground)] text-2xl p-2 hover:text-[#67e242] transition-colors"
          aria-label="Back to home"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1 className="text-[#67e242] text-center text-4xl font-bold tracking-tight">
          {project.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Media & Links */}
        <div className="flex flex-col gap-8">
          <div className="media-container">
            {project.videoUrl ? (
              <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src={project.videoUrl}
                  title="Project Video"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {project.images?.map((img: string, idx: number) => (
                  <div key={idx} className="relative w-full aspect-video group overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={img}
                      alt={`${project.title} preview ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {project.github && (
              <Link href={project.github} target="_blank" className="gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold">
                GitHub <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
            {project.demo && (
              <Link href={project.demo} target="_blank" className="gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold">
                Live Demo <FontAwesomeIcon icon={faLaptopCode} />
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="md:px-8 md:border-l-2 border-[#67e242]/30 flex flex-col gap-10">
          <section>
            <h2 className="text-[#67e242] text-xl font-mono mb-4 flex items-center gap-2">
              <span className="opacity-50 text-sm">01.</span> ABOUT
            </h2>
            <p className="whitespace-pre-line text-[var(--foreground)] leading-relaxed">
              {project.description}
            </p>
          </section>

          <section>
            <h2 className="text-[#67e242] text-xl font-mono mb-4 flex items-center gap-2">
              <span className="opacity-50 text-sm">02.</span> STACK
            </h2>
            <div className="flex flex-wrap gap-6 justify-start grayscale hover:grayscale-0 transition-all">
              {project.technologies?.map((tech: string, idx: number) => (
                <div key={idx} title={tech} className="hover:scale-110 transition-transform">
                  <Image 
                    src={`/images/${tech.toLowerCase()}.svg`} 
                    alt={tech} 
                    width={45} 
                    height={45} 
                    className="drop-shadow-[0_0_8px_rgba(103,226,66,0.3)]"
                  />
                </div>
              ))}
            </div>
          </section>

          {project.features && (
            <section>
              <h2 className="text-[#67e242] text-xl font-mono mb-4 flex items-center gap-2">
                <span className="opacity-50 text-sm">03.</span> FEATURES
              </h2>
              <ul className="grid grid-cols-1 gap-2">
                {project.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-[#67e242] mt-1">▹</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.members && project.members.length > 0 && (
            <section>
              <h2 className="text-[#67e242] text-xl font-mono mb-4 flex items-center gap-2">
                <span className="opacity-50 text-sm">04.</span> TEAM
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.members.map((member: any, idx: number) => (
                  <a 
                    key={idx} 
                    href={member.url} 
                    target="_blank" 
                    className="py-1.5 px-4 text-xs border border-[#67e242] rounded-full hover:bg-[#67e242] hover:text-black transition-all font-medium"
                  >
                    @{member.name}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}