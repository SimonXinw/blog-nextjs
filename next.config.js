/** @type {import('next').NextConfig} */
const fs = require("fs");
const path = require("path");

function getRootDirectories() {
  // 获取根目录下的一级文件夹
  const rootPath = path.resolve(__dirname);
  const directories = fs
    .readdirSync(rootPath, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  return directories;
}

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
  webpack(config) {
    // 获取根目录下的所有一级文件夹
    const rootDirectories = getRootDirectories();

    // 将这些文件夹添加到 Webpack 的模块解析路径中
    rootDirectories.forEach((dir) => {
      config.resolve.modules.push(path.resolve(__dirname, dir));
    });

    return config;
  },
};

module.exports = nextConfig;
