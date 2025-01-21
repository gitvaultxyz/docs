/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Reduce webpack logs
  webpack: (config, { isServer, dev }) => {
    // Only log errors in development
    config.infrastructureLogging = {
      level: 'error',
    }
    
    // Reduce stats output
    config.stats = {
      preset: 'errors-only',
      moduleTrace: false,
      errorDetails: false,
    }

    return config
  },
}

module.exports = nextConfig 