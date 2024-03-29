/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'cuponerapp.com', 'www.cuponerapp.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
