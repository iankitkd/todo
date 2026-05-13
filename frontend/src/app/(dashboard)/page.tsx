import TodoForm from "@/components/dashboard/TodoForm";
import TodoItem from "@/components/dashboard/TodoItems";
import { apiRequest } from "@/lib/apiRequest";
import { TodoType } from "@/types";

export default async function DashboardPage() {
  const todos = await apiRequest("/api/todos", "GET");
  console.log(todos, "todo");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">My Todos</h1>

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
