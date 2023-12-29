// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import userJson from "../../constants/api/user.json";
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

const authMiddleware = (cookieStr: string) => {
  // 解析cookie字符串到一个对象
  const cookies = cookie.parse(cookieStr || "");

  const token = cookies[TOKEN_KEY_NAME];

  const data = jwt.verify(token, SECRET_KEY);

  const hasUser = !!userJson.list.find(
    (item: any) =>
      item.password === data?.password && item.username === data?.username
  );

  console.log("data>>>>>>>>", data, "hasUser >>>>", hasUser);

  return hasUser;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // 判空
  if (req.method !== "POST" && req.method !== "post") return;

  const { query, headers } = req;

  const hasAuth = authMiddleware(headers?.cookie || "");

  if (hasAuth) return res.status(200).json(createResponse());

  const { username, password } = query;

  // Error 没有值
  if (!(username && password)) return createResponse({ success: false });

  const userJsonProxy: any = userJson;

  userJsonProxy.list.push(query); // 假设 userData 是一个数组

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

  const token = jwt.sign(query, SECRET_KEY, { expiresIn: "1h" });

  res.setHeader("Set-Cookie", `${TOKEN_KEY_NAME}=${token}; path=/; HttpOnly`);

  const result = createResponse({
    data: "登录成功, token 已经设置 Cookies 里面.",
  });

  console.table(query);
  console.log(filepath);

  res.status(200).json(result);
}
