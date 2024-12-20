// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import { parse as cookieParse } from "cookie";
import { find, map } from "lodash";
import { findUserAll } from "lib/supabase/queries/user";

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

export async function GET(req: NextRequest) {
  try {
    // 查找目标用户
    const users = await findUserAll();

    if (!users) {
      return NextResponse.json(
        createResponse({ success: false, data: "Error: 用户未存在" }),
        { status: 400 }
      );
    }

    return NextResponse.json(createResponse({ success: true, data: users }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      createResponse({ success: false, data: "用户请求失败" }),
      { status: 500 }
    );
  }
}
