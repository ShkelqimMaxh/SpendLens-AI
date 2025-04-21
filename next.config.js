/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/spendlens-ai', // Replace with your repository name
  assetPrefix: '/spendlens-ai/', // Replace with your repository name
}

module.exports = nextConfig 