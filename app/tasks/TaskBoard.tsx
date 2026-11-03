"use client";

import { useState } from "react";
import type { Task, CreateTaskInput } from "@/lib/schemas";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import FilterBar from "./FilterBar";
import type { Filter } from "./FilterBar";

export default function TaskBoard({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");

  function handleAddTask(input: CreateTaskInput) {
    const newTask: Task = {
      id: Date.now(),
      title: input.title,
      dueDate: input.dueDate || undefined,
      done: input.status === "done",
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function handleToggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  if (tasks.length === 0) {
    return (
      <main>
        <p>No tasks yet. Add your first one below.</p>
        <NewTaskForm onAddTask={handleAddTask} />
      </main>
    );
  }

  return (
    <main>
      <NewTaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={tasks}
        filter={filter}
        onToggleTask={handleToggleTask}
      />
    </main>
  );
}