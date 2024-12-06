// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import userJson from "@/constants/api/user.json";
import cookie from "cookie";

type CreateResponseType = {
  code?: number;
  success?: boolean;
  data?: any;
  message?: string;
};

/**
 * 格式化返回数据
 */
const createResponse = ({
  code = 200,
  success = true,
  data = null,
  message = "",
}: CreateResponseType) => ({
  code,
  success,
  data,
  message,
});

/**
 * 生成 Token
 */
const generateToken = (data: any) => {
  return jwt.sign(data, SECRET_KEY, { algorithm: "HS256", expiresIn: "1h" });
};

/**
 * 鉴权中间件
 */
const authMiddleware = (cookieStr: string) => {
  const cookies = cookie.parse(cookieStr || "");
  const oldToken = cookies[TOKEN_KEY_NAME];

  try {
    const tokenData = jwt.verify(oldToken, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    const newToken = generateToken(tokenData);
    return { token: newToken, isAccess: true };
  } catch (e) {
    return { token: null, isAccess: false };
  }
};

export default function POST(req: NextApiRequest) {
  const { username, password } = req.body || {};

  // 校验参数是否完整
  if (!username || !password) {
    return NextResponse.json(
      createResponse({ success: false, message: "Error: 缺少账号或密码" }),
      { status: 400 }
    );
  }

  const existingUser = userJson.data.find(
    (item: any) => item.username === username
  );
  if (existingUser) {
    return NextResponse.json(
      createResponse({ success: false, message: "Error: 账号已存在" }),
      { status: 409 }
    );
  }

  // 添加用户到 JSON 数据
  const newUser = {
    id: userJson.data.length + 1,
    loginType: "normal", // 默认值为 "normal"，可以根据需要调整
    username,
    password,
  };

  userJson.data.push(newUser);

  const filePath = path.join(
    process.cwd(),
    "src",
    "constants",
    "api",
    "user.json"
  );
  fs.writeFileSync(filePath, JSON.stringify(userJson, null, 2));

  // 生成 Token 并设置到 Cookie
  const token = generateToken({ username, loginType: newUser.loginType });

  const result = createResponse({
    data: newUser,
    message: "注册成功，Token 已设置到 Cookies 中",
  });

  const response = NextResponse.json(result, { status: 201 });
  response.headers.set(
    "Set-Cookie",
    `${TOKEN_KEY_NAME}=${token}; Path=/; HttpOnly`
  );

  return response;
}
