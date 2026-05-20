/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Prevent EMFILE "too many open files" on Windows during `next build`
  // by disabling the tracing step (not needed for local builds).
  outputFileTracing: false,
}

module.exports = nextConfig
