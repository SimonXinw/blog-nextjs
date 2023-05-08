// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type ParamsTs = {
  username: string;
  password: string;
};

/**
 * @格式化返回数据
 */

const createResult = (params?: ParamsTs) => {
  return {
    code: 200,
    success: true,
    data: params || null,
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // 判空
  if (req.method !== 'POST' && req.method !== 'post') return;

  const { query } = req;

  const resultParams = createResult();

  console.table(query);

  res.status(200).json(resultParams);
}
