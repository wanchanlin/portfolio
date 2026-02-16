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
    <div className="w-full py-24 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
      <div className="relative min-w-max px-[15vw]">
        
        {/* 1. ANIMATED BACKBONE */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--retro-primary)] opacity-30 -translate-y-1/2 origin-left"
        />

        <div className="flex flex-nowrap gap-20 items-center min-h-[700px] relative">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className={`relative flex flex-col items-center w-85 flex-shrink-0 ${
                index % 2 === 0 ? 'justify-end pb-36' : 'justify-start pt-36'
              }`}
            >
              
              {/* 2. PULSING LINKING DOT */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                  className="w-5 h-5 rounded-full bg-[var(--retro-primary)] border-4 border-[var(--background)] shadow-[0_0_15px_var(--retro-primary)]"
                />
                <motion.div 
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute inset-0 rounded-full bg-[var(--retro-primary)] -z-10"
                />
              </div>

              {/* 3. GROWING VERTICAL CONNECTOR */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '144px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className={`absolute left-1/2 w-[2px] bg-gradient-to-b from-[var(--retro-primary)] to-transparent -translate-x-1/2 ${
                  index % 2 === 0 ? 'bottom-1/2' : 'top-1/2 rotate-180'
                }`}
              />
              
              {/* 4. UNIFORM SPRING-ANIMATED CARD */}
              <motion.div 
                initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  type: "spring", 
                  damping: 12, 
                  stiffness: 90, 
                  delay: 0.3 + (index * 0.1) 
                }}
                className="relative bg-[var(--background)] border-2 border-[var(--retro-primary)] p-6 shadow-[8px_8px_0px_var(--foreground)] w-80 h-[360px] flex flex-col z-10 hover:shadow-[12px_12px_0px_var(--retro-primary)] transition-all duration-300"
              >
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-black px-3 py-1 border-2 border-black uppercase shadow-[2px_2px_0px_black] z-30">
                  {item.type}
                </div>

                <div className="flex-grow flex flex-col overflow-hidden">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-1">
                      <FontAwesomeIcon 
                        icon={item.type === 'work' ? faBriefcase : faGraduationCap} 
                        className="text-[var(--retro-primary)] text-xl"
                      />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="text-[var(--retro-primary)] font-mono text-sm font-bold italic flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendar} className="text-[10px]" />
                      <span>{item.period}</span>
                    </div>
                    <div className="text-[var(--foreground)] font-bold text-md uppercase opacity-60">
                      {item.company}
                    </div>
                  </div>
                  
                  <div className="flex-grow border-t border-[var(--retro-primary)]/20 pt-4">
                    <ul className="space-y-2">
                      {item.description.slice(0, 2).map((desc, i) => (
                        <li key={i} className="text-sm text-[var(--foreground)] leading-relaxed flex items-start gap-2">
                          <span className="text-[var(--retro-primary)] font-bold">»</span>
                          <span className="line-clamp-3 opacity-80">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Fixed Footer for Tech */}
                <div className="mt-4 pt-4 border-t border-[var(--retro-primary)]/10">
                  <div className="flex flex-wrap gap-2">
                    {item.technologies?.slice(0, 5).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-0.5 bg-[var(--foreground)] text-[var(--background)] text-xs font-mono border border-[var(--retro-primary)]/50 uppercase tracking-tighter"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}