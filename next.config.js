/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: prod ? false : true,

  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  // next.js config
});
