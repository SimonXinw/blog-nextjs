// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { deleteUserById } from "lib/supabase/queries/user";

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // Error 没有值
  if (!id) {
    return NextResponse.json(
      createResponse({ success: false, data: "Error: 没有 id" }),
      { status: 200 }
    );
  }

  const deleteRes = await deleteUserById(Number(id));

  if (!deleteRes) {
    return NextResponse.json(
      createResponse({ success: false, data: "Error: 删除失败" }),
      { status: 400 }
    );
  }

  return NextResponse.json(createResponse({ success: true, data: deleteRes }), {
    status: 200,
  });
}
