import { SignJWT, jwtVerify } from "jose";
import { SECRET_KEY, TOKEN_KEY_NAME } from "src/constants/user";

// 将 SECRET_KEY 转换为 Uint8Array 格式
const SECRET_KEY_BYTES = new TextEncoder().encode(SECRET_KEY);

/**
 * 使用 jose 生成 JWT
 * @param data 数据对象
 * @returns 生成的 JWT
 */
export const generateToken = async (data: any) => {
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h") // 1小时有效期
    .sign(SECRET_KEY_BYTES);

  return token;
};

/**
 * 验证并刷新 Token
 * @param cookies 请求中的 Cookies 对象
 * @returns 新的 Token 或 null（验证失败）
 */
export const auth = async (cookies: any) => {
  const oldToken = cookies.get(TOKEN_KEY_NAME)?.value;

  if (!oldToken) {
    console.error("Error: 未找到 Token");
    return null;
  }

  try {
    // 验证 Token 并解码数据
    const { payload } = await jwtVerify(oldToken, SECRET_KEY_BYTES, {
      algorithms: ["HS256"],
    });

    // 根据旧 Token 的 payload 生成新 Token
    const newToken = await generateToken(payload);

    return newToken;
  } catch (e) {
    console.error(`Error: 验证不通过 - ${e}`);
    
    return null;
  }
};
