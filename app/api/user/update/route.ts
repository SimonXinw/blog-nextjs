// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { updateUserById } from "lib/supabase/queries/user";
import { find, map } from "lodash";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json(
        createResponse({ success: false, data: "Error: 缺少 id 参数" }),
        { status: 400 }
      );
    }

    const updateRes = await updateUserById(body);

    if (!updateRes) {
      return NextResponse.json(
        createResponse({ success: false, data: "更新失败" }),
        { status: 200 }
      );
    }

    return NextResponse.json(
      createResponse({ success: true, data: updateRes }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      createResponse({ success: false, data: "更新失败" }),
      { status: 500 }
    );
  }
}
