import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-it-incubator.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
