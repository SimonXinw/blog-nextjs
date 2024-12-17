import supabase from "lib/supabase";
import type { User } from "../types";

export async function findUserAll() {
  try {

    const { data, error } = await supabase
      .from("user") // 表名
      .select("*"); // 查询所有字段
    console.timeEnd("查询所有用户时间"); // 开始计时

    if (error) {
      console.error("Error querying user findUserAll:", error);
      return null; // 或者根据需求返回错误信息
    }

    return data; // 成功时返回用户数据
  } catch (err) {
    console.error("Unexpected error findUserAll:", err);
    return null; // 捕获意外的异常
  }
}

export async function findUserById(id: number) {
  try {
    const { data, error } = await supabase
      .from("user") // 表名
      .select("*") // 查询所有字段
      .eq("id", id) // 条件：username 等于给定值
      .single(); // 返回单条数据（如果匹配多条，抛出错误）

    if (error) {
      console.error("Error querying user findUserById:", error);
      return null; // 或者根据需求返回错误信息
    }

    return data; // 成功时返回用户数据
  } catch (err) {
    console.error("Unexpected error findUserById:", err);
    return null; // 捕获意外的异常
  }
}

export async function updateUserById({ id, ...args }: User) {
  try {
    // 使用 Supabase 更新数据
    const { data, error } = await supabase
      .from("user") // 替换为你的表名
      .update(args) // 替换为列名和值
      .eq("id", id); // 根据 ID 查找

    if (error) {
      throw new Error(`更新失败 updateUserById: ${error.message}`);
    }

    return data; // 返回更新后的数据
  } catch (err) {
    console.error("发生错误 updateUserById:", err);

    return null; // 返回 null 表示失败
  }
}

export async function findUserByName(username: string) {
  try {
    const { data, error } = await supabase
      .from("user") // 表名
      .select("*") // 查询所有字段
      .eq("username", username); // 条件：username 等于给定值

    if (error) {
      console.error("Error querying user findUserByName:", error);
      return null; // 或者根据需求返回错误信息
    }

    return data?.length > 0 ? data[0] : null; // 成功时返回用户数据
  } catch (err) {
    console.error("Unexpected error findUserByName:", err);
    return null; // 捕获意外的异常
  }
}

/**
 * 添加用户
 */
export async function createUser(params: User) {
  try {
    // 定义要插入的数据
    const newUser: User = {
      loginType: params?.loginType ?? "account", // 默认值
      ...params,
    };

    // 插入数据到 Supabase 表
    const { data, error } = await supabase
      .from("user") // 表名
      .insert(newUser)
      .select("*"); // 可选：返回插入的数据

    if (error) {
      console.error("Error adding user:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}

// 更新用户
export async function updateUser(params: User) {
  try {
    // 更新 Supabase 表中的数据
    const { data, error } = await supabase
      .from("user") // 表名
      .update({ password: params.password }) // 要更新的字段及其新值
      .eq("username", params.username); // 条件：匹配 username

    if (error) {
      console.error("Error updating user:", error);
      return null;
    }

    console.log("User updated:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}

export const deleteUserById = async (id: number): Promise<boolean | null> => {
  try {
    // 删除记录
    const { error } = await supabase
      .from("user") // 替换为你的表名
      .delete()
      .eq("id", id);

    if (error) {
      console.error("删除用户失败 error:", error);

      return null;
    }

    return true;
  } catch (error: any) {
    console.error("Unexpected  error deleteUserById:", error);

    return null;
  }
};
