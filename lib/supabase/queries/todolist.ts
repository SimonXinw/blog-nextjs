import supabase from "lib/supabase";

// 定义数据模型类型
export interface Todo {
  id?: number;
  user_id: number;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  due_date: string | null; // ISO 日期字符串
  tags?: string[];
  is_deleted?: boolean;
  created_at?: string; // ISO 日期字符串
  updated_at?: string; // ISO 日期字符串
}

export interface User {
  id: number;
  name: string;
  email: string;
}

// 增加待办事项
export async function addTodo(params: {
  user_id: number;
  title: string;
  priority: "low" | "medium" | "high";
  description?: string;
  due_date?: string;
  tags?: string[];
}): Promise<Todo | null> {
  try {
    const {
      user_id,
      title,
      description,
      priority,
      due_date = null,
      tags,
    } = params;
    const { data, error } = await supabase
      .from("todolist")
      .insert([
        {
          user_id,
          title,
          description,
          priority,
          due_date: due_date,
          tags,
        },
      ])
      .single();

    if (error) throw error;

    console.log("Todo added:", data);
    return data;
  } catch (error) {
    console.error("Error adding todo:", error);
    return null;
  }
}

// 查询某用户的待办事项
export async function getTodosByUser(user_id: number): Promise<Todo[] | null> {
  try {
    const { data, error } = await supabase
      .from("todolist")
      .select("*")
      .eq("user_id", user_id)
      .order("due_date", { ascending: true });

    if (error) throw error;

    console.log("Todos fetched:", data);

    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
}

// 查询单个待办事项
export async function getTodoById(id: number): Promise<Todo | null> {
  try {
    const { data, error } = await supabase
      .from("todolist")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    console.log("Todo fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
}

// 更新待办事项
export async function updateTodo(
  id: number,
  updates: Partial<Omit<Todo, "id" | "user_id">>
): Promise<Todo | null> {
  try {
    const { data, error } = await supabase
      .from("todolist")
      .update(updates)
      .eq("id", id)
      .single();

    if (error) throw error;
    console.log("Todo updated:", data);
    return data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
}

// 软删除待办事项
export async function softDeleteTodo(id: number): Promise<Todo | null> {
  try {
    const { data, error } = await supabase
      .from("todolist")
      .update({ is_deleted: true })
      .eq("id", id)
      .single();

    if (error) throw error;
    console.log("Todo soft-deleted:", data);
    return data;
  } catch (error) {
    console.error("Error soft-deleting todo:", error);
    return null;
  }
}

// 硬删除待办事项
export async function deleteTodoPermanently(id: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("todolist").delete().eq("id", id);

    if (error) throw error;

    console.log("Todo permanently deleted");

    return true;
  } catch (error) {
    console.error("Error deleting todo permanently:", error);
    return false;
  }
}

// 查询用户的待办事项及其用户信息
export async function getTodosWithUser(
  user_id: number
): Promise<(Todo & { user: User })[] | null> {
  try {
    const { data, error } = await supabase
      .from("todolist")
      .select(
        `
        *,
        user:users (id, name, email)
      `
      )
      .eq("user_id", user_id);

    if (error) throw error;
    console.log("Todos with user details fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching todos with user details:", error);
    return null;
  }
}
