import { NextRequest, NextResponse } from "next/server";
import {
  addTodo,
  getTodosByUser,
  updateTodo,
  deleteTodoPermanently,
  softDeleteTodo,
} from "lib/supabase/queries/todolist"; // 引入之前实现的 Supabase 方法]
import { USER_INFO } from "@/constants/user";
import type { DBUser } from "lib/supabase/types";

// Handle POST request for adding a new todo
export async function POST(request: NextRequest) {
  try {
    const userInfoStr = request.cookies.get(USER_INFO)?.value || "";

    const userInfo: DBUser = JSON.parse(userInfoStr);

    const body = await request.json();

    if (!userInfo?.id || !body) {
      return NextResponse.json(
        { success: false, message: "todolist 缺少必要参数" },
        { status: 200 }
      );
    }

    const todo = await addTodo({ ...body, user_id: userInfo.id });

    return NextResponse.json(
      { code: 200, success: true, data: todo },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Handle GET request to fetch todos by user_id
export async function GET(request: NextRequest) {
  try {
    const userInfoStr = request.cookies.get(USER_INFO)?.value || "";

    const userInfo: DBUser = JSON.parse(userInfoStr);

    if (!userInfo) {
      return NextResponse.json(
        { error: "Missing user_id query parameter" },
        { status: 400 }
      );
    }

    const todos = await getTodosByUser(userInfo.id);

    return NextResponse.json(
      { code: 200, success: true, data: todos },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PUT request to update a todo
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing todo id" }, { status: 400 });
    }

    const updatedTodo = await updateTodo(id, updates);
    return NextResponse.json(
      { code: 200, success: true, data: updatedTodo },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PATCH request to soft delete a todo
export async function PATCH(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop(); // Extract id from URL

  if (!id) {
    return NextResponse.json({ error: "Missing todo id" }, { status: 400 });
  }

  try {
    const softDeletedTodo = await softDeleteTodo(Number(id));
    return NextResponse.json(softDeletedTodo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle DELETE request to permanently delete a todo
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Extract id from URL

  if (!id) {
    return NextResponse.json({ error: "Missing todo id" }, { status: 400 });
  }

  try {
    const deletedTodo = await deleteTodoPermanently(Number(id));

    return NextResponse.json(
      { code: 200, success: true, data: deletedTodo },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
