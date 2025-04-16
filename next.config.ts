import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/collection',
        permanent: true, // Use true for a 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;