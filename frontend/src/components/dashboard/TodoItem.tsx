"use client";

import { deleteTodo, toggleSubTodo, toggleTodo } from "@/actions/todo.actions";
import { SubTodoType, TodoType } from "@/types";
import { Circle, CircleCheck, Trash } from "lucide-react";

export default function TodoItem({
  todo,
  isSubTodo = false,
}: {
  todo: TodoType | SubTodoType;
  isSubTodo?: boolean;
}) {
  const toggleHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.stopPropagation();
    if (isSubTodo) {
      await toggleSubTodo(todo.documentId, todo.isCompleted);
    }
    await toggleTodo(todo.documentId, todo.isCompleted);
  };

  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.stopPropagation();
    await deleteTodo(todo.documentId);
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 bg-card border border-border rounded-xl ${isSubTodo ? "px-2 py-1" : "px-4 py-2"}`}
    >
      <button
        onClick={toggleHandler}
        className={`w-5 h-5 rounded flex items-center justify-center transition cursor-pointer
          ${todo.isCompleted ? "text-green-400" : "text-secondary-foreground"}`}
      >
        {todo.isCompleted ? <CircleCheck /> : <Circle />}
      </button>

      <p
        className={`flex-1 ${todo.isCompleted ? "line-through text-muted-foreground" : ""}`}
      >
        {todo.title}
      </p>

      {!isSubTodo && (
        <button
          onClick={deleteHandler}
          className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg cursor-pointer"
        >
          <Trash size={16} />
        </button>
      )}
    </div>
  );
}
