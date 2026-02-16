"use client";

import React, { useState } from "react";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import Character from "../components/Character";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("Program");

  const tabs = ["Program", "Design"];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 font-mono ">
      {/* Hero Section */}
      <section className="md:grid md:grid-cols-2 gap-8 items-center">
        <div className="">
          {/* <p className="text-lg leading-relaxed text-[var(--foreground)]">
            With 9+ years at the crossroads of design and development, I
            create engaging digital experiences that blend creativity and
            function. From graphic design and motion graphics to web
            development, I’ve worked across entertainment, fashion, and
            tech—adapting to diverse creative needs. Proficient in Adobe
            Creative Suite and driven by evolving trends, I bring ideas to
            life through impactful visual storytelling.
            <span className="text-[var(--button)] ml-1">|</span>
          </p> */}
          <div>
          <h1 className="text-xs uppercase tracking-widest mb-4 opacity-70 underline decoration-dotted  ">
              System.Status: Online
            </h1>
            <p className="text-xl leading-relaxed font-bold">
              {"> "}I blend <span className="bg-yellow-500 text-black p-2 border border-[var(--foreground) shadow-[2px_2px_0px_var(--foreground)]">design</span> and <span className="bg-yellow-500 text-black p-2 border border-[var(--foreground) shadow-[2px_2px_0px_var(--foreground)]">code</span> to build the future of the web. 9+ years of terminal experience.
            </p>
        </div>

        </div>
        {/* <div className="flex justify-center md:justify-end ">
          <Image
            src="/images/profilelight.jpg"
            alt="Professional photo"
            width={420}
            height={220}
            className="object-cover shadow-[8px_8px_0px_var(--foreground)]"
          />
        </div> */}
        <div>
        
          <div className="w-full max-w-xs mx-auto border-4 border-[var(--retro-primary)] shadow-[8px_8px_0px_var(--foreground)]">
              <Character/>
              
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="mt-12 w-full bg-size-[0.7em] h-4 bg-repeat-x bg-size-[1.4em] md:bg-size-[2em] h-8 pattern-dot-three"></div>

      {/* Services Section */}
      <section className="mt-12">
        <h2 id="services" className="text-2xl font-semibold mb-4">
          {`{ SERVICES }`}
        </h2>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-xs font-bold uppercase border-2 rounded-pixel-lg transition-all ${
                activeTab === tab
                  ? "bg-[var(--retro-primary)] text-[var(--retro-bg)] shadow-[4px_4px_0px_var(--foreground)]"
                  : "border-[var(--retro-primary)] opacity-60 hover:opacity-100"
              }`}
            >
              {tab}.sh
            </button>
          ))}
        </div>

        {/* Tab Content: Program */}
        <div className={activeTab === "Program" ? "block" : "hidden"}>
          <div className="border-2 pattern-square  p-6  shadow-[4px_4px_0px_var(--foreground)]">
            <div className="service-content">
              <Image className="mb-3" src="/images/code.png" alt="Code Icon" width={50} height={50} />
              <h3 className="text-xl font-semibold mb-2">Program</h3>
              <p className="text-[var(--foreground)]">
                Creating dynamic and responsive websites using the latest web technologies. 
                I ensure that your website is not only visually appealing but also functional and user-friendly.
                <span className="text-[var(--button)] ml-1">|</span>
              </p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {["Full-Stack Development", "Database Management", "API Integration"].map((skill) => (
                   <li key={skill} className=" text-[var(--foreground)] px-3 py-1 text-sm border border-[var(--foreground)] shadow-[2px_2px_0px_var(--foreground)] ">
                    {skill}
                   </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-4 items-center">
                <Image src="/images/html.svg" alt="HTML" width={30} height={30} />
                <Image src="/images/css.svg" alt="CSS" width={30} height={30} />
                <Image src="/images/javascript.svg" alt="JS" width={30} height={30} />
                <Image src="/images/git.svg" alt="Git" width={30} height={30} />
                <Image src="/images/node.svg" alt="Node" width={30} height={30} />
                <Image src="/images/react.png" alt="React" width={30} height={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content: Design */}
        <div className={activeTab === "Design" ? "block" : "hidden"}>
          <div className="border-2 border-[var(--retro-primary)] p-6 p-6  shadow-[4px_4px_0px_var(--foreground)] ">
            <div className="service-content">
              <Image className="mb-3" src="/images/design.png" alt="Design Icon" width={50} height={50} />
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-[var(--foreground)]">
                Crafting visually stunning designs for various media, including graphic design, 
                video production, and motion graphics.
                <span className="text-[var(--button)] ml-1">|</span>
              </p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {["UI/UX Design", "Graphic Design", "Motion Graphics", "Video Production", "Adobe Creative Suite"].map((skill) => (
                   <li key={skill} className="text-[var(--foreground)] px-3 py-1 text-sm border border-[var(--foreground)] shadow-[2px_2px_0px_var(--foreground)] ">
                    {skill}
                   </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-4 items-center">
                <Image src="/images/Figma.svg" alt="Figma" width={30} height={30} />
                <Image src="/images/photoshop.png" alt="Photoshop" width={30} height={30} />
                <Image src="/images/illustrator.png" alt="Illustrator" width={30} height={30} />
                <Image src="/images/aftereffects.svg" alt="After Effects" width={30} height={30} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <ContactForm />
      </section>
    </main>
  );
}