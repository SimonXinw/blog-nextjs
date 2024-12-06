// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import userJson from "../../../constants/api/user.json";
import cookie from "cookie";

type CreateResponseType = {
  code?: number;
  success?: boolean;
  data?: any;
};

/**
 * @格式化返回数据
 */

const createResponse = (params?: CreateResponseType) => {
  const { code = 200, data = null, success = true } = params || {};

  return {
    code: code,
    success,
    data: data,
  };
};

const generateToken = (data: any) => {
  const token = jwt.sign(data, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  return token;
};

const authMiddleware = (cookieStr: string) => {
  // 解析cookie字符串到一个对象
  const cookies = cookie.parse(cookieStr || "");

  const oldToken = cookies[TOKEN_KEY_NAME];

  try {
    // 验证旧的 refresh token
    const tokenData = jwt.verify(oldToken, SECRET_KEY, {
      algorithms: ["HS256"],
    });

    // 假设我们只需要用户 ID 来生成新 token
    const newToken = generateToken(tokenData);

    return {
      token: newToken,
      isAccess: true,
    };
  } catch (e) {
    return {
      token: null,
      isAccess: false,
    };
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // 判空
  if (req.method !== "POST" && req.method !== "post") return;

  const { query, headers } = req;

  const { username, password } = query;

  // Error 没有值
  if (!(username && password)) {
    return res
      .status(200)
      .json(
        createResponse({ success: false, data: "Error: 没有输入账号密码" })
      );
  }

  const hasUser = !!userJson.data.find(
    (item: any) => item.password === password && item.username === username
  );

  if (hasUser) {
    return res
      .status(200)
      .json(createResponse({ success: false, data: "Error: 账号密码已存在" }));
  }

  const userJsonProxy: any = userJson;

  userJsonProxy.data.push({ id: userJsonProxy.data?.length + 1, ...query }); // 假设 userData 是一个数组

  // 将 JSON 对象转换为字符串
  const userJsonString = JSON.stringify(userJsonProxy);

  // 写入 JSON 数据到文件
  const filepath = path.join(
    process.cwd(),
    "src",
    "constants",
    "api",
    "user.json"
  );

  fs.writeFileSync(filepath, userJsonString);

  const token = generateToken(query);

  res.setHeader("Set-Cookie", `${TOKEN_KEY_NAME}=${token}; path=/; HttpOnly`);

  const result = createResponse({
    data: "注册成功, token 已经设置 Cookies 里面.",
  });

  res.status(200).json(result);
}
