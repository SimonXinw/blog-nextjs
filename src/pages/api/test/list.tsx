// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SECRET_KEY, TOKEN_KEY_NAME } from "@/constants/api/user";
import userJson from "../../../constants/api/user.json";
import testJson from "../../../constants/api/test.json";
import testCountJson from "../../../constants/api/testCount.json";
import { wait } from "@/utils/index";
import { escape, filter } from "lodash";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

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
    timestamp: new Date().getTime(),
  };
};

const getOrderIndex = () => {
  const index = testCountJson?.count % 2;

  const newJson = {
    ...testCountJson,
    count: testCountJson.count + 1,
  };

  // 将 JSON 对象转换为字符串
  const jsonString = JSON.stringify(newJson);

  // 写入 JSON 数据到文件
  const filepath = path.join(
    process.cwd(),
    "src",
    "constants",
    "api",
    "testCount.json"
  );

  fs.writeFileSync(filepath, jsonString);

  return index;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // 判空
  if (req.method !== "GET" && req.method !== "get")
    return res
      .status(200)
      .json(createResponse({ success: false, data: "请求方法为 GET" }));

  const index = getOrderIndex();

  if (index === 0) {
    setTimeout(() => {
      const jsonArr = [userJson, testJson];

      const jsonContent = jsonArr[index];

      res
        .status(200)
        .json(createResponse({ success: false, data: jsonContent.data }));
    }, 4000);
  } else {
    const jsonArr = [userJson, testJson];

    const jsonContent = jsonArr[index];

    res
      .status(200)
      .json(createResponse({ success: false, data: jsonContent.data }));
  }
}
