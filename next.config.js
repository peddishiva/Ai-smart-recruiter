/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress hydration warnings caused by browser extensions
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Disable React DevTools in production
  productionBrowserSourceMaps: false,
  // Ensure output is standalone for better Vercel deployment
  output: 'standalone',
  // Set the output file tracing root to suppress workspace warnings
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
