import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config (if any)
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // Optional: Add runtime caching if needed
    // runtimeCaching: [...]
  }
});