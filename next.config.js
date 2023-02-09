/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  // disable: process.env.NODE_ENV === 'development',
  
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA({
  // next.js config
})