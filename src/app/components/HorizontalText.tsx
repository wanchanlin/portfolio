"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Timeline from './Timeline2'; 

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollText() {
  const componentRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!scrollWrapperRef.current || !componentRef.current) return;

      const scrollWidth = scrollWrapperRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // The total amount to move the container to the left
      const scrollDistance = scrollWidth - viewportWidth;

      gsap.to(scrollWrapperRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,           // Keeps the section fixed while scrolling
          scrub: 1,            // Smoothly links scroll position to animation
          start: "top top",
          end: () => `+=${scrollDistance}`, // Length of the scroll
          invalidateOnRefresh: true, 
        },
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="overflow-hidden">
      {/* This inner div is what actually moves. 
          w-fit ensures it expands to fit all timeline items. 
      */}
      <div ref={scrollWrapperRef} className="flex flex-nowrap items-center h-screen w-fit px-[10vw]">
        
        {/* Experience Header */}
        <div className="flex-shrink-0 mr-24">
          <h2 className="text-3xl font-bold text-[var(--foreground)] whitespace-nowrap uppercase tracking-tighter">
            {`{ Experience }`}
          </h2>
          
        </div>

        {/* Timeline Content */}
        <div className="flex-shrink-0">
          <Timeline 
            items={[
              {
                id: '1',
                title: 'Web Developer',
                company: 'Polaron Tech',
                period: '2026 - Present',
                type: 'work',
                description: ['Built scalable Next.js apps', 'Led frontend architecture'],
                technologies: ['React', 'Next.js', 'HTML', 'CSS']
              },
              {
                id: '2',
                title: 'Wordpress Developer',
                company: 'LSC Tech',
                period: '2025 - 2026',
                type: 'work',
                description: ['Pixel-perfect UI implementation', 'Client-side optimization'],
                technologies: ['Html', 'CSS', 'GSAP']
              },
              {
                id: '3',
                title: 'Web Development Student',
                company: 'Humber College',
                period: '2024 - 2025',
                type: 'education',
                description: ['Specialized in Software Systems', 'Dean\'s List'],
                technologies: [ 'Web Development Fundamentals','php', 'HTML', 'CSS', 'SQL', '.NET',]
              },
              {
                id: '4',
                title: 'Web Designer',
                company: 'Rakuten',
                period: '2020',
                type: 'work',
                description: ['Internal tool development', 'API integrations'],
                technologies: ['Html', 'CSS', 'Javascript']
              }
            ]}
          />
        </div>

        {/* Closing spacer to give some breathing room at the end */}
        <div className="w-[20vw] flex-shrink-0" />
      </div>
    </section>
  );
}