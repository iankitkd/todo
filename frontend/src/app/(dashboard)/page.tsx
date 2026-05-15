import { getTodos } from "@/actions/todo.actions";
import TodoForm from "@/components/dashboard/TodoForm";
import TodoGroup from "@/components/dashboard/TodoGroup";
import { TodoType } from "@/types";

export default async function DashboardPage() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">My Todos</h1>

        <TodoForm />

        <div className="space-y-3">
          {todos?.map((todo: TodoType) => (
            <TodoGroup key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}
