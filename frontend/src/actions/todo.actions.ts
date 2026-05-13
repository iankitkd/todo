"use server";

import { apiRequest } from "@/lib/apiRequest";
import { revalidatePath } from "next/cache";

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
