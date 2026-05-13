import TodoForm from "@/components/dashboard/TodoForm";
import TodoItem from "@/components/dashboard/TodoItem";
import { apiRequest } from "@/lib/apiRequest";
import { TodoType } from "@/types";

export default async function DashboardPage() {
  const todos = await apiRequest("/api/todos", "GET");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">My Todos</h1>

        <TodoForm />

        <div className="space-y-3">
          {todos.data?.map((todo: TodoType) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}
