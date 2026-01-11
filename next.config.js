/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in development
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = 'eval-source-map'; // Use a faster source map for development
    }
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
