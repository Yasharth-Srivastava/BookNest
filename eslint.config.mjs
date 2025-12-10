/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;