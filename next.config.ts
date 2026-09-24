import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Job applications include a CV (up to 4MB, see lib/careers/shared.ts).
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      // Images uploaded from the dashboard (Vercel Blob).
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Cover photos of the sample blog posts.
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/coming-soon',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
