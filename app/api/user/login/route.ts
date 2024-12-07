// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import userJson from "@/constants/api/user.json";
import cookie from "cookie";

type CreateResponseType = {
  code?: number;
  success?: boolean;
  data?: any;
  msg?: string;
};

/**
 * @格式化返回数据
 */

const createResponse = (params?: CreateResponseType) => {
  const { code = 200, data = null, success = true, msg } = params || {};

  return {
    code: code,
    success,
    data,
    msg,
  };
};

const generateToken = (data: any) => {
  const token = jwt.sign(data, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  return token;
};

const authMiddleware = (cookies: any) => {
  // 解析cookie字符串到一个对象

  const oldToken = cookies.get(TOKEN_KEY_NAME);

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

export default function POST(req: NextApiRequest) {
  const { searchParams } = new URL(req.url || "");

  const authData = authMiddleware(req.cookies);

  if (authData.isAccess) {
    const response = NextResponse.json(
      createResponse({ msg: "Token 已经更新" }),
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `${TOKEN_KEY_NAME}=${authData.token}; path=/; HttpOnly`
    );
  }

  const username = searchParams.get("username");

  const password = searchParams.get("password");

  // Error 没有值
  if (!(username && password)) {
    return NextResponse.json(
      createResponse({ success: false, msg: "Error: 没有输入账号密码" }),
      { status: 200 }
    );
  }

  const hasUser = !!userJson.data.find(
    (item: any) => item.password === password && item.username === username
  );

  if (!hasUser) {
    return NextResponse.json(
      createResponse({ success: false, msg: "Error: 账号密码错误" }),
      { status: 200 }
    );
  }

  const token = generateToken({ username });

  const result = createResponse({
    data: "登录成功, token 已经设置 Cookies 里面.",
  });

  const response = NextResponse.json(result, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    `${TOKEN_KEY_NAME}=${token}; path=/; HttpOnly`
  );
}
