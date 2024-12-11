import { NextResponse } from "next/server";
import {
  addTodo,
  getTodosByUser,
  updateTodo,
  deleteTodoPermanently,
  softDeleteTodo,
} from "lib/supabase/queries/todolist"; // 引入之前实现的 Supabase 方法

// Handle POST request for adding a new todo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const todo = await addTodo(body);
    return NextResponse.json(todo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle GET request to fetch todos by user_id
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = Number(searchParams.get("user_id"));

  if (!user_id) {
    return NextResponse.json(
      { error: "Missing user_id query parameter" },
      { status: 400 }
    );
  }

  try {
    const todos = await getTodosByUser(user_id);
    return NextResponse.json(todos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PUT request to update a todo
export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing todo id" }, { status: 400 });
    }

    const updatedTodo = await updateTodo(id, updates);
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PATCH request to soft delete a todo
export async function PATCH(request: Request) {
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
export async function DELETE(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop(); // Extract id from URL

  if (!id) {
    return NextResponse.json({ error: "Missing todo id" }, { status: 400 });
  }

  try {
    const deletedTodo = await deleteTodoPermanently(Number(id));
    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
