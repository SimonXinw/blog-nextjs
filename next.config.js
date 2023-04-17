/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'p9-juejin.byteimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.xinwangblog.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
