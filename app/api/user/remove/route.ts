// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import userJson from "@/constants/api/user.json";

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

  console.log("删除走进来了，准备读取文件");

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

  console.log("删除走进来了，文件已保存");

  return NextResponse.json(createResponse({ success: true, data: id }), {
    status: 200,
  });
}
