/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,
  },
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["mixed-decls", "legacy-js-api", "import", "slash-div", "global-builtin"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",   
        port: "8000",          
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.29.73",
        port: "8002",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;