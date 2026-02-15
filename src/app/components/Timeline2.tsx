'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

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
    <div className="w-full">
      <div className="px-10">
        {/* Container for the items - flex-nowrap is key for horizontal scroll */}
        <div className="flex flex-nowrap gap-12 items-center min-h-[500px]">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className={`relative flex flex-col items-center w-80 flex-shrink-0 ${
                index % 2 === 0 ? 'justify-end pb-24' : 'justify-start pt-24'
              }`}
            >
              {/* Animated Timeline Dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--retro-primary)] border-4 border-[var(--foreground)] rounded-full z-10 shadow-[2px_2px_0px_var(--foreground)]"
              ></motion.div>

              {/* Animated Connector Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: 96 }} // Increased to match pt-24/pb-24
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`absolute left-1/2 w-0.5 bg-[var(--retro-primary)]/30 transform -translate-x-1/2 ${
                  index % 2 === 0 ? 'bottom-1/2' : 'top-1/2'
                }`}
              ></motion.div>
              
              {/* Animated Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-[var(--background)] border-2 border-[var(--retro-primary)]/20 rounded-lg p-5 shadow-[4px_4px_0px_var(--foreground)] hover:shadow-[6px_6px_0px_var(--foreground)] transition-shadow duration-300 w-full"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FontAwesomeIcon 
                    icon={item.type === 'work' ? faBriefcase : faGraduationCap} 
                    className="text-[var(--retro-primary)]"
                  />
                  <h3 className="text-lg font-bold text-[var(--foreground)] truncate">
                    {item.title}
                  </h3>
                </div>
                
                <div className="text-[var(--retro-primary)] font-mono text-xs mb-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>{item.period}</span>
                </div>
                
                <div className="text-[var(--foreground)] font-semibold text-sm mb-3">
                  {item.company}
                </div>
                
                <ul className="space-y-1.5 mb-3">
                  {item.description.slice(0, 2).map((desc, descIndex) => (
                    <li key={descIndex} className="text-xs text-[var(--foreground)]/80 flex items-start gap-2">
                      <span className="text-[var(--retro-primary)]">▸</span>
                      <span className="line-clamp-2">{desc}</span>
                    </li>
                  ))}
                </ul>
                
                {item.technologies && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-0.5 bg-[var(--retro-primary)]/10 text-[var(--retro-primary)] text-[10px] font-mono border border-[var(--retro-primary)]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}