const API_BASE_URL = "/todolist";

export const addTodo = async (todo: {
  user_id: string;
  title: string;
  description?: string;
  priority?: number;
  due_date?: string;
  tags?: string[];
}) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return response.json();
};

export const getTodosByUser = async (user_id: number | string) => {
  const response = await fetch(`${API_BASE_URL}?user_id=${user_id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

export const updateTodo = async (id: string, updates: Record<string, any>) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const softDeleteTodo = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/soft-delete/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to soft delete todo");
  }

  return response.json();
};

export const deleteTodoPermanently = async (id: string | number) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo permanently");
  }

  return response.json();
};
