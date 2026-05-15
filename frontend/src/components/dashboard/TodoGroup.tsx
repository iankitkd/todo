"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import { TodoType } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function TodoGroup({ todo }: { todo: TodoType }) {
  const [open, setOpen] = useState(false);
  const hasSubtodos = todo.subtodos && todo.subtodos.length > 0;

  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex gap-2 items-center"
      >
        <div className="pt-3 text-sm w-4 select-none">
          {hasSubtodos && open ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </div>

        {/* Todo */}
        <div className="flex-1">
          <TodoItem todo={todo} />
        </div>
      </div>

      {/* Subtodos */}
      {hasSubtodos && open && (
        <div className="pl-10 py-2 space-y-2">
          {todo.subtodos.map((sub) => (
            <TodoItem key={sub.id} todo={sub} isSubTodo={true} />
          ))}
        </div>
      )}
    </div>
  );
}
