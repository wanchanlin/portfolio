import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { client } from "../../../sanity/lib/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import ContactForm from "../../components/ContactForm"; 
import { Button as SanityButton } from "@sanity/ui";
import Button from '../../components/Button';

// --- Interfaces ---

interface ProjectMember {
  _id: string;
  name: string;
  imageUrl?: string;
  bio?: any[];
  slug: {
    current: string;
  };
  imageSrc?: string;
}

interface Project {
  imageSrc?: string;
  title: string;
  description: string;
  slug: string;
  technologies: string[];
  images?: string[];
  features?: string[];
  demo?: string;
  github?: string;
  videoUrl?: string;
  content?: any[];
  members?: ProjectMember[];
}

type PageProps = { params: Promise<{ slug: string }> };

// --- Data Fetching ---

async function getProject(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    technologies,
    "imageSrc": mainImage.asset->url, 
    "images": gallery[].asset->url,
    features,
    "demo": liveDemoUrl,
    "github": githubUrl,
    videoUrl,
    content,
    members[]->{
      _id,
      name,
      "imageUrl": image.asset->url,
      bio,
      slug
    }
  }`;
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return {
    title: project?.title ? `${project.title} | Portfolio` : "Project Not Found",
    description: project?.description || "Project details",
  };
}

// --- Component ---

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
      h2: ({ children }) => <h2 className="text-2xl  mt-8 mb-4 ">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl mt-6 mb-3">{children}</h3>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-5 space-y-2 mb-4">{children}</ul>,
    },
    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a 
            href={value?.href} 
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-[#67e242] hover:underline"
          >
            {children}
          </a>
        );
      },
    },
  };

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
    <>
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

        {/* Content Grid */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Media */}
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
                  {project.images
                    ?.filter((img): img is string => typeof img === 'string' && img.length > 0)
                    ?.map((img: string, idx: number) => (
                    <div key={idx} className="relative w-full aspect-video group overflow-hidden rounded-lg border border-white/10">
                      <Image
                        src={img}
                        alt={`${project.title} preview ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-8">
          <div className="border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)] bg-[#ffffff]/20 w-full aspect-videooverflow-hidden">
        {project.imageSrc ? (
          <img
            src={project.imageSrc}
            alt={`Preview of ${project.title}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-out "
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/40 text-sm" aria-hidden>No image</div>
        )}
      </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {project.github && (
                <Button href={project.github}  icon={faGithub}> GitHub</Button>

                // <Link href={project.github} target="_blank" className="gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold">
                //   GitHub <FontAwesomeIcon icon={faGithub} />
                // </Link>
              )}
              {project.demo && (
                                <Button href={project.demo}  icon={faLaptopCode}> Live Demo</Button>

                // <Link href={project.demo} target="_blank" className="gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold">
                //   Live Demo <FontAwesomeIcon icon={faLaptopCode} />
                // </Link>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:px-8 md:border-l-2 border-[#67e242]/30 flex flex-col gap-10">
            <section>
              <h2 className="text-2xl font-mono mb-4 flex items-center gap-2">
                 STACK
              </h2>
              <div className="flex flex-wrap gap-6 justify-start">
                {project.technologies?.map((tech: string, idx: number) => (
                  <div key={idx} title={tech} className="relative group hover:scale-110 transition-transform">
                    <Image 
                      src={`/images/${tech.toLowerCase()}.svg`} 
                      alt={tech} 
                      width={35} 
                      height={35} 
                      className="grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section>
              
              <div className="prose max-w-none text-[var(--foreground)]">
                <PortableText value={project.content} components={components} />
              </div>
            </section>

            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-[#67e242] text-2xl font-mono mb-4 flex items-center gap-2">
                  <span className="opacity-50 text-sm">03.</span> FEATURES
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-[var(--foreground)]">{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Team Members */}
            {project.members && project.members.length > 0 && (
              <section className="mt-4">
                <h2 className="text-[#67e242] text-2xl font-mono mb-6">
                   <span className="opacity-50 text-sm">04.</span> TEAM
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {project.members.map((member) => (
                    <div key={member._id} className="bg-white/5 p-4 rounded-lg flex items-center gap-4">
                      {member.imageUrl && (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#67e242] shrink-0">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg">{member.name}</h3>
                        {member.bio && (
                          <div className="text-xs text-gray-400">
                            <PortableText value={member.bio} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Contact Section */}
               <section id="contact" className="relative md:max-w-5xl mx-auto my-24 border-2 border-[var(--retro-primary)] md:p-16 p-8 shadow-[8px_8px_0px_var(--foreground)] ">
          
                  {/* The "Contact Me" Badge */}
                  <h2 className="absolute -top-6 -left-4 md:-left-8 rotate-[-5deg] bg-yellow-500 text-black font-mono font-bold uppercase p-2 px-6 border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)] hover:rotate-0 transition-transform cursor-default z-10">
                    contact_me.exe
                  </h2>
        
                  <div className="mt-8 md:mt-0">
                    <ContactForm />
                  </div>
          </section>
      </main>
      
    </>
  );
}