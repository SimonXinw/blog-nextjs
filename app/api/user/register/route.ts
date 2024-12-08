// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import { parse as cookieParse } from "cookie";
import { findUserByName, createUser } from "lib/supabase/queries/user";

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
  const cookies = cookieParse(cookieStr || "");
  const oldToken = cookies[TOKEN_KEY_NAME] || "";

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

export async function POST(req: Request) {
  const body = await req.json();

  const { username, password } = body;

  // 校验参数是否完整
  if (!username || !password) {
    return NextResponse.json(
      createResponse({ success: false, message: "Error: 缺少账号或密码" }),
      { status: 400 }
    );
  }

  const userData = await findUserByName(username);

  if (userData) {
    return NextResponse.json(
      createResponse({ success: false, message: "Error: 账号已存在" }),
      { status: 400 }
    );
  }

  // 添加用户到 JSON 数据
  const newUser = {
    loginType: "account",
    username,
    password,
  };

  const createUserRes = await createUser(newUser);

  if (!createUserRes) {
    return NextResponse.json(
      createResponse({ success: false, message: "Error: 创建用户失败" }),
      { status: 500 }
    );
  }

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
