import request from "@/services/axios";

export const remove = (id: number) => {
  return request("/user/remove", { params: { id } });
};
