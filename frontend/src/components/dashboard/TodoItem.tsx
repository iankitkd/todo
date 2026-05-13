"use client";

import { deleteTodo, toggleTodo } from "@/actions/todo.actions";
import { TodoType } from "@/types";

export default function TodoItem({ todo }: { todo: TodoType }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-card border border-border rounded-xl px-4 py-2">
      <button
        onClick={() => toggleTodo(todo.documentId, todo.isCompleted)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition cursor-pointer
          ${
            todo.isCompleted
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-400"
          }`}
      >
        {todo.isCompleted && "✓"}
      </button>

      <p
        className={`flex-1 ${todo.isCompleted ? "line-through text-muted-foreground" : ""}`}
      >
        {todo.title}
      </p>

      <button
        onClick={() => deleteTodo(todo.documentId)}
        className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
