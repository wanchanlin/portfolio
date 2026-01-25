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
  date?: string;
}

export default function ProjectCard({
  number,
  title,
  description,
  technologies,
  slug,
  imageSrc,
  link,
  date
}: ProjectCardProps) {
  return (
    
      <div className='flex flex-col gap-4 md:grid md:grid-cols-2 items-center justify-center px-4 py-8'  >
        
        <div className='flex flex-col gap-2'>
          <div>{number}</div>
          <p className='text-sm'>{date}</p>
          {/* <p className='text-2xl font-bold'>{title}</p> */}
           <p className="text-3xl font-bold">{title}</p>

          <div className="flex flex-row gap-4 mt-4 justify-start">
            {technologies.map((tech) => (
              <Image
                key={tech}
                src={`/images/${tech}.svg`}
                alt={tech}
                width={50}
                height={50}
              />
            ))}
          </div>
          <p className='text-sm text-[var(--foreground)] t'>{description}</p>
          <Link href={link} className=" w-fit gap-2 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg hover:bg-[var(--retro-primary)] hover:text-[var(--retro-bg)] transition-all font-bold">
            View More
            <FontAwesomeIcon icon={faChevronRight} className="chevron" />
          </Link>
        </div>
        <div className="w-full h-full">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

  
  )
}