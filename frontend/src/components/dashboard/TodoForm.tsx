"use client";

import { createTodoWithSubtodos } from "@/actions/todo.actions";
import { useState } from "react";

export default function TodoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const checkTitle = (value: string) => {
    if (!value) {
      setError("Title is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    checkTitle(value);
    setTitle(value);
  };

  const onSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!checkTitle(title)) {
      return;
    }
    setIsSubmitting(true);

    await createTodoWithSubtodos(title);

    setIsSubmitting(false);
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-start gap-2">
      <div className="flex-1">
        <input
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Add todo..."
          required
          className="w-full rounded-lg bg-input border border-border px-4 py-3"
        />
        {error && <p className="text-sm text-destructive mt-1 ml-1">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground text-background px-5 py-3 rounded-lg"
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
