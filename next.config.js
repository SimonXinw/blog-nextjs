/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.xinwangblog.cn",
        port: "443",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
