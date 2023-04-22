/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.xinwangblog.cn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
