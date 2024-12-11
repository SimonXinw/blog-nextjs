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
  return request(`/user/${id}`, { method: "DELETE" });
};

export const getList = (id?: number) => {
  return request("/user", { params: { id } }).then((res: any) => {
    if (!res?.success) return null;

    return res.data;
  });
};

export const update = (data: any) => {
  return request("/user/update", { method: "POST", data }).then((res: any) => {
    if (!res?.success) return null;

    return res.data;
  });
};
