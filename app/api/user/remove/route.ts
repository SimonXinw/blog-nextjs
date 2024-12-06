// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import userJson from "@/constants/api/user.json";
import cookie from "cookie";
import { filter } from "lodash";

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

  const oldToken = cookies[TOKEN_KEY_NAME] || "";

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url || "");

  const id = searchParams.get("id");

  // Error 没有值
  if (!id) {
    return NextResponse.json(
      createResponse({ success: false, data: "Error: 没有 id" }),
      { status: 200 }
    );
  }

  const data = filter(userJson.data, function (item: any) {
    return item.id != id; // 假设我们想要删除id为2的对象
  });

  userJson.data = data;

  // 将 JSON 对象转换为字符串
  const userJsonString = JSON.stringify(userJson);

  // 写入 JSON 数据到文件
  const filepath = path.join(
    process.cwd(),
    "src",
    "constants",
    "api",
    "user.json"
  );

  fs.writeFileSync(filepath, userJsonString);

  return NextResponse.json(createResponse({ success: true, data: id }), {
    status: 200,
  });
}
