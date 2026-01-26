/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Optimize package imports
  experimental: {
    esmExternals: 'loose'
  },

  // Webpack configuration - removed devtool modification
  webpack: (config, { isServer, dev }) => {
    // Add any necessary webpack configurations here
    // without modifying devtool in development
    return config;
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Add output file tracing for better deployment
  output: 'standalone',
  
  // Add images configuration
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
};

module.exports = nextConfig;