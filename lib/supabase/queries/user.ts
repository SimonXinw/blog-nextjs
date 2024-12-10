import supabase from "lib/supabase";
import type { User } from "../types";

export async function findUserAll() {
  try {
    const { data, error } = await supabase
      .from("user") // 表名
      .select("*"); // 查询所有字段

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

export async function findUserByName(username: string) {
  try {
    const { data, error } = await supabase
      .from("user") // 表名
      .select("*") // 查询所有字段
      .eq("username", username) // 条件：username 等于给定值
      .single(); // 返回单条数据（如果匹配多条，抛出错误）

    if (error) {
      console.error("Error querying user:", error);
      return null; // 或者根据需求返回错误信息
    }

    return data; // 成功时返回用户数据
  } catch (err) {
    console.error("Unexpected error:", err);
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

    console.log("User added:", data);
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
    console.time("计算时间"); // 开始计时
    const { error } = await supabase
      .from("user") // 替换为你的表名
      .delete()
      .eq("id", id);

    console.timeEnd("计算时间"); // 结束计时并输出耗时
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
