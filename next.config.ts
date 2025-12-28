import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // PWA Support
  output: 'standalone',
  serverExternalPackages: [
    '@clerk/nextjs',
    '@huggingface/inference',
    'pdf-parse',
    'tesseract.js',
    'mammoth'
  ],
  // Turbopack configuration for PWA
  turbopack: {},
};

export default nextConfig;
