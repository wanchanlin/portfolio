'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  icon?: any
  iconPosition?: 'left' | 'right'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  target?: string
  rel?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  icon,
  iconPosition = 'right',
  className = '',
  type = 'button',
  target,
  rel
}: ButtonProps) {
  
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'mt-4 w-fit gap-3 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg  hover:shadow-[2px_2px_0px_var(--foreground)]  shadow-[4px_4px_0px_var(--foreground)] transition-all font-bold group',
    secondary: 'mt-4 w-fit gap-3 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg  hover:shadow-[2px_2px_0px_var(--foreground)]  shadow-[4px_4px_0px_var(--foreground)] transition-all font-bold group',
    outline: 'mt-4 w-fit gap-3 flex items-center border-2 border-[var(--retro-primary)] px-6 py-2 rounded-pixel-lg  hover:shadow-[2px_2px_0px_var(--foreground)]  shadow-[4px_4px_0px_var(--foreground)] transition-all font-bold group'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm rounded-pixel',
    md: 'px-6 py-2 text-base rounded-pixel-lg',
    lg: 'px-8 py-3 text-lg rounded-pixel-lg'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  const iconElement = icon && (
    <FontAwesomeIcon 
      icon={icon} 
      className={`text-xs transition-transform duration-300 ${iconPosition === 'right' ? 'ml-2 group-hover:translate-x-1' : 'mr-2 group-hover:-translate-x-1'}`}
    />
  )
  
  const content = (
    <>
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </>
  )
  
  if (href && !disabled) {
    return (
      <Link 
        href={href}
        className={`${classes} group`}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      className={`${classes} group`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
