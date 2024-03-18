import request from "./axios";

export const register = (params: any) => {
  const url = "/user/register";
  return request({ url, method: "POST", params });
};

export const login = (params: any) => {
  const url = "/user/login";
  return request({ url, method: "POST", params });
};
