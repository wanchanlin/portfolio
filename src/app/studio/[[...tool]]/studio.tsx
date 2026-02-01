'use client'

import dynamic from 'next/dynamic'
import { Suspense, Component, ErrorInfo, ReactNode, useState, useEffect } from 'react'
import config from '../../../../sanity.config'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error in Sanity Studio:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem' }}>
          <h2>Something went wrong loading Sanity Studio</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export function Studio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ padding: '2rem' }}>Loading Studio...</div>
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Studio...</div>}>
        <NextStudio config={config} />
      </Suspense>
    </ErrorBoundary>
  )
}