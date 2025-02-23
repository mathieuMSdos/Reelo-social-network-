import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/mathieumsdos/**",
      },
    ],
  },
  /* Ajout de la config pour ignorer les tests */
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs TS au build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore les erreurs ESLint au build
  },
  webpack: (config) => {
    // Ajout de la règle pour ignorer les fichiers de test
    config.module.rules.push({
      test: /\.(spec|test)\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      loader: "ignore-loader",
    });
    return config;
  },
};

export default nextConfig;
