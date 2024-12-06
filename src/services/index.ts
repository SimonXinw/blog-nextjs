import request from "./axios";

export const register = (params: any) => {
  const url = "/user/register";
  return request({ url, method: "POST", data: params });
};

export const login = (params: any) => {
  const url = "/user/login";
  return request({ url, method: "POST", params });
};

export const remove = (id: number) => {
  return request("/user/remove", { params: { id } });
};

export const findList = (id?: number) => {
  return request("/test/list", { params: { id } });
};
