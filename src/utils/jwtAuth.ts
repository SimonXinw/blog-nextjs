import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_KEY_NAME } from "src/constants/user";

export const generateToken = (data: any) => {
  return jwt.sign(data, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const auth = (cookies: any) => {
  const oldToken = cookies.get(TOKEN_KEY_NAME)?.value;

  try {
    const tokenData = jwt.verify(oldToken, SECRET_KEY, {
      algorithms: ["HS256"],
    });

    return generateToken(tokenData);
  } catch (e) {
    console.error(`Error: 验证不通过- ${e}`);
    return null;
  }
};
