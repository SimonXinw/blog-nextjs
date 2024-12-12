import request from "./axios";
const API_BASE_URL = "/todolist";

export const addTodo = (todo: {
  title: string;
  description?: string;
  priority?: number;
  due_date?: string;
  tags?: string[];
}) => {
  return request(API_BASE_URL, {
    method: "POST",
    data: todo,
  }).then((res: any) => res?.success);
};

export const getTodosByUser = async () => {
  return request(`${API_BASE_URL}`).then((res: any) => res.data);
};

export const updateTodo = async (updates: Record<string, any>) => {
  return request(`${API_BASE_URL}`, {
    method: "PUT",
    data: updates,
  });
};

export const softDeleteTodo = async (id: string) => {
  return request(`${API_BASE_URL}/soft-delete/${id}`, {
    method: "PATCH",
  });
};

export const deleteTodoPermanently = async (id: string | number) => {
  return request(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE",
  });
};
