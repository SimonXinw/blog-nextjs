import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import { USER_INFO } from "@/constants/user";
import { findUserByName } from "lib/supabase/queries/user";

type CreateResponseType = {
  code?: number;
  success?: boolean;
  data?: any;
  message?: string;
};

const createResponse = (params?: CreateResponseType) => {
  const { code = 200, data = null, success = true, message } = params || {};
  return { code, success, data, message };
};

const generateToken = (data: any) => {
  return jwt.sign(data, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

const authMiddleware = async (cookies: any) => {
  const oldToken = cookies.get(TOKEN_KEY_NAME)?.value;

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

export async function POST(req: NextRequest) {
  const url = req.url ? new URL(req.url) : null;

  if (!url) {
    return NextResponse.json(
      createResponse({ success: false, message: "Invalid URL" }),
      { status: 400 }
    );
  }

  const { searchParams } = url;

  const authData = await authMiddleware(req.cookies);

  if (authData.isAccess) {
    const response = NextResponse.json(
      createResponse({ message: "Token 已经更新" }),
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `${TOKEN_KEY_NAME}=${authData.token}; Path=/; HttpOnly; SameSite=Strict`
    );

    return response;
  }

  const username = searchParams.get("username");
  const password = searchParams.get("password");

  if (!(username && password)) {
    return NextResponse.json(
      createResponse({ success: false, message: "用户名和密码是必填项" }),
      { status: 200 }
    );
  }

  const userData = await findUserByName(username);

  if (!userData) {
    return NextResponse.json(
      createResponse({ success: false, message: "账号或密码错误" }),
      { status: 200 }
    );
  }

  const token = generateToken({ username });

  const userInfo = JSON.stringify(userData);

  const response = NextResponse.json(
    createResponse({ data: "登录成功，token 已设置在 Cookies 中" }),
    { status: 200 }
  );

  response.headers.set(
    "Set-Cookie",
    `${TOKEN_KEY_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict;${USER_INFO}=${userInfo}; Path=/; HttpOnly; SameSite=Strict`
  );

  return response;
}
