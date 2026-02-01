/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Strict Mode to avoid PT editor double-mount and "Cannot resolve a DOM node from Slate node"
  reactStrictMode: false,
  transpilePackages: ['@sanity', 'next-sanity', 'react-syntax-highlighter'],
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@sanity/vision'],
  },
  // Add this to handle ESM packages
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
}

module.exports = nextConfig