'use client'

import React from 'react'
import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
]

export default function Footer2() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full px-4">
      <div className="mx-auto my-8 flex max-w-5xl flex-col items-center justify-between gap-4 bg-[var(--background)] px-2 py-2  dark:border-t dark:border-[var(--foreground)] dark:bg-[var(--background)] md:flex-row md:justify-start md:py-2">
        
        {/* Copyright Section */}
        <div className="text-[var(--foreground)] dark:text-[var(--foreground)]">
          <p className="text-center md:text-sm text-xs">
            © {currentYear} Joyce's Portfolio. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center md:flex-row md:ml-auto">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="md:text-sm text-xs text-[var(--foreground)] no-underline hover:text-gray-600 dark:text-[var(--foreground)] dark:hover:text-gray-500 md:ml-6"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
      </div>
    </footer>
  )
}