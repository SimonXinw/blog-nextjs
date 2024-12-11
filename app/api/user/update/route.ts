// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import userJson from "@/constants/api/user.json";
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

    // 查找目标用户
    const user = find(userJson.data, { id: Number(id) });

    if (!user) {
      return NextResponse.json(
        createResponse({ success: false, data: "Error: 用户未找到" }),
        { status: 404 }
      );
    }

    // 更新用户数据
    const updatedData = map(userJson.data, (item) => {
      if (item.id === Number(id)) {
        return { ...item, ...updateFields }; // 更新目标用户的字段
      }
      return item;
    });

    userJson.data = updatedData;

    // 将 JSON 对象转换为字符串
    const userJsonString = JSON.stringify(userJson, null, 2);

    // 写入 JSON 数据到文件
    const filepath = path.join(
      process.cwd(),
      "src",
      "constants",
      "api",
      "user.json"
    );

    fs.writeFileSync(filepath, userJsonString);

    return NextResponse.json(
      createResponse({ success: true, data: updatedData }),
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
