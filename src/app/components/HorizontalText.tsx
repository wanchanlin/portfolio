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
    <section ref={componentRef} className="overflow-hidden bg-[var(--background)]">
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
                title: 'Full Stack Developer',
                company: 'Tech Company',
                period: '2022 - Present',
                type: 'work',
                description: ['Built scalable Next.js apps', 'Led frontend architecture'],
                technologies: ['React', 'Next.js', 'TS']
              },
              {
                id: '2',
                title: 'Frontend Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                type: 'work',
                description: ['Pixel-perfect UI implementation', 'Client-side optimization'],
                technologies: ['Vue.js', 'Tailwind', 'GSAP']
              },
              {
                id: '3',
                title: 'Computer Science',
                company: 'University of Tech',
                period: '2016 - 2020',
                type: 'education',
                description: ['Specialized in Software Systems', 'Dean\'s List'],
                technologies: ['Java', 'C++', 'Algorithms']
              },
              {
                id: '4',
                title: 'Junior Dev',
                company: 'Startup Hub',
                period: '2015',
                type: 'work',
                description: ['Internal tool development', 'API integrations'],
                technologies: ['Node.js', 'Express']
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