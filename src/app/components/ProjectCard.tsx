'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  slug: string;
  technologies: string[];
  imageSrc: string;
  link: string;
  // FIX: Sanity returns a string, but we handle both for safety
  displaydate?: string | Date; 
}

export default function ProjectCard({
  number,
  title,
  description,
  technologies = [], // Default to empty array to prevent .map errors
  imageSrc,
  link,
  displaydate
}: ProjectCardProps) {

  const formattedDate = React.useMemo(() => {
    // If it's missing or explicitly "Ongoing" from your Sanity GROQ coalesce
    if (!displaydate || displaydate === 'Ongoing') return 'Ongoing';
    
    const parsedDate = new Date(displaydate);
    
    // Check for "Invalid Date"
    if (isNaN(parsedDate.getTime())) return 'Ongoing';

    return parsedDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric',
      timeZone: 'UTC' // Best practice for Sanity dates to avoid timezone shifts
    });
  }, [displaydate]);

  return (
    <div className='flex flex-col gap-8 md:grid md:grid-cols-2 items-center justify-center px-4 py-8 border-b border-white/10 last:border-none'>
      
      {/* Text Content */}
      <div className='flex flex-col gap-3'>
        <div className="font-mono text-[var(--retro-primary)]">{number}</div>
        
        <p className='text-xs opacity-60 uppercase tracking-[0.2em] font-medium'>
          {formattedDate}
        </p>
        
        <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          {title}
        </h3>

        <div className="flex flex-wrap gap-3 mt-2 mb-4 justify-start">
          {(technologies || []).filter((t): t is string => typeof t === 'string').map((tech) => (
            <div key={tech} className="relative group">
               <Image
                src={`/images/${tech.toLowerCase()}.svg`}
                alt={tech}
                width={32}
                height={32}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              {/* Simple Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
                {tech}
              </span>
            </div>
          ))}
        </div>

        <p className='text-sm leading-relaxed text-[var(--foreground)] opacity-80 max-w-md'>
          {description}
        </p>

        <Link 
          href={link} 
          className="mt-4 w-fit gap-3 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold group"
        >
          VIEW PROJECT
          <FontAwesomeIcon icon={faChevronRight} className="text-xs transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Project Image */}
      <div className="w-full aspect-video overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Preview of ${title}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/40 text-sm" aria-hidden>No image</div>
        )}
      </div>
    </div>
  )
}