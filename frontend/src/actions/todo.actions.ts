"use server";

import { generateSubtodos } from "@/lib/ai";
import { apiRequest } from "@/lib/apiRequest";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  const res = await apiRequest("/api/todos", "GET");
  return res?.data;
}

export async function createTodoWithSubtodos(title: string) {
  if (!title) {
    return {
      success: false,
      message: "Title is required.",
    };
  }

  // Create main todo
  const todoRes = await apiRequest("/api/todos", "POST", {
    data: { title },
  });

  const todo = todoRes?.data;

  // Generate subtodos with AI
  const aiResult = await generateSubtodos(title);

  // Save subtodos
  if (aiResult?.subtasks?.length > 0) {
    await Promise.all(
      aiResult.subtasks.map((subtask: string) =>
        apiRequest("/api/subtodos", "POST", {
          data: {
            title: subtask,
            todo: todo.id,
          },
        }),
      ),
    );
  }

  revalidatePath("/");
}

export async function createTodo(title: string) {
  if (!title) {
    return {
      success: false,
      message: "Title is required.",
    };
  }

  await apiRequest("/api/todos", "POST", { data: { title } });

  revalidatePath("/");
}

export async function toggleTodo(id: string, isCompleted: boolean) {
  const res = await apiRequest(`/api/todos/${id}`, "PUT", {
    data: { isCompleted: !isCompleted },
  });

  console.log(res);

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await apiRequest(`/api/todos/${id}`, "DELETE");
  revalidatePath("/");
}

export async function toggleSubTodo(id: string, isCompleted: boolean) {
  await apiRequest(`/api/subtodos/${id}`, "PUT", {
    data: { isCompleted: !isCompleted },
  });

  revalidatePath("/");
}
