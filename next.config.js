/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
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
