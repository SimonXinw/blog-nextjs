This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
先 build
```bash
pnpm build
```
再 start

```bash
pnpm dev
```

## 部署服务器
这里增加了一个 `ecosystem.config.js` pm2 配置文件，脚本可以在这里跑，服务器上面直接 pm2 start 就行

```bash
pm2 start --watch

# 保存列表
pm2 save

# 自动启动
pm2 startup
```

Open [http://localhost:7777](http://localhost:7777) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `app/api/hello.ts`.

The `app/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# 设置全局用户名
git config --global user.name "你的名字"

# 设置全局邮箱
git config --global user.email "你的邮箱@example.com"

# 设置当前仓库的用户名
git config user.name "你的名字"

# 设置当前仓库的邮箱
git config user.email "你的邮箱@example.com"

# 删除配置
git config --global --unset user.name

git config --global --unset user.email

# 配置代理
ngrok http http://localhost:7777
