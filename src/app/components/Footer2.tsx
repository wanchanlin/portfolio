'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
]

export default function Footer2() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full px-4">
  <div className="mx-auto my-8 flex w-full max-w-5xl flex-col md:flex-row items-center justify-between gap-4 bg-[var(--background)]/90 border-t-[2px]  border-[var(--foreground)] px-4 py-4 ">
    
    {/* Copyright Section - Force center on mobile, left on desktop */}
    <div className="text-[var(--foreground)]">
      <p className="text-center md:text-left md:text-sm text-xs font-mono">
        © {currentYear} JOYCE.EXE <br className="md:hidden" /> 
        <span className="hidden md:inline"> | </span>
        All rights reserved. 
        <a href="/privacy" className="ml-2 hover:bg-[var(--retro-primary)] hover:text-black px-1 underline transition-colors">
          privacy_policy
        </a>
      </p>
    </div>

    {/* Social Icons - Pushed to the right on desktop */}
    <div className="flex items-center gap-6 flex-row md:ml-auto">
      <Link href="https://github.com/wanchanlin" target="_blank" aria-label="GitHub" className="hover:-translate-y-1 transition-transform">
        <FontAwesomeIcon icon={faGithub} className='text-3xl hover:text-[var(--retro-primary)]'/>
      </Link>
      <Link href="https://www.linkedin.com/in/wanchanlin/" target="_blank" aria-label="LinkedIn" className="hover:-translate-y-1 transition-transform">
        <FontAwesomeIcon icon={faLinkedin} className='text-3xl hover:text-[var(--retro-primary)]'/>
      </Link>
    </div>
    
  </div>
</footer>
  )
}