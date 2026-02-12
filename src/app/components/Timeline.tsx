'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap, faCalendar } from '@fortawesome/free-solid-svg-icons'

interface TimelineItem {
  id: string
  title: string
  company: string
  period: string
  description: string[]
  type: 'work' | 'education'
  technologies?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-[var(--retro-primary)]/30"></div>
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <div 
            key={item.id}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--retro-primary)] border-4 border-[var(--background)] rounded-full z-10 shadow-[2px_2px_0px_var(--foreground)]"></div>
            
            {/* Content Card */}
            <div className={`ml-16 md:ml-0 md:w-5/12 ${
              index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
            }`}>
              <div className="bg-[var(--background)] border-2 border-[var(--retro-primary)]/20 rounded-pixel-lg p-6 shadow-[4px_4px_0px_var(--foreground)] hover:shadow-[6px_6px_0px_var(--foreground)] transition-all duration-300">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-3 md:justify-end">
                  <FontAwesomeIcon 
                    icon={item.type === 'work' ? faBriefcase : faGraduationCap} 
                    className="text-[var(--retro-primary)]"
                  />
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </div>
                
                <div className={`text-[var(--retro-primary)] font-mono text-sm mb-2 md:justify-end flex items-center gap-2 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'
                }`}>
                  <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                  <span>{item.period}</span>
                </div>
                
                <div className={`text-[var(--foreground)] font-semibold mb-4 ${
                  index % 2 === 0 ? 'md:text-right' : 'text-left'
                }`}>
                  {item.company}
                </div>
                
                {/* Description */}
                <ul className={`space-y-2 mb-4 ${
                  index % 2 === 0 ? 'md:text-right' : 'text-left'
                }`}>
                  {item.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-sm text-[var(--foreground)]/80 flex items-start gap-2">
                      <span className="text-[var(--retro-primary)] mt-1">▸</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 md:justify-end">
                    {item.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-[var(--retro-primary)]/10 text-[var(--retro-primary)] text-xs font-mono rounded-pixel border border-[var(--retro-primary)]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
