'use client'

import Button from './Button'

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: any
  iconPosition?: 'left' | 'right'
  className?: string
  target?: string
  rel?: string
}

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  target,
  rel
}: ButtonLinkProps) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      icon={icon}
      iconPosition={iconPosition}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </Button>
  )
}