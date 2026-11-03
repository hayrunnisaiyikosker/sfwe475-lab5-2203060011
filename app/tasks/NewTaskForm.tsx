import { useState } from "react";
import type { FormEvent } from "react";
import { CreateTaskSchema } from "@/lib/schemas";
import type { CreateTaskInput } from "@/lib/schemas";

type Props = {
  onAddTask: (input: CreateTaskInput) => void;
};

function NewTaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("open");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = CreateTaskSchema.safeParse({
      title,
      dueDate,
      status: taskStatus,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onAddTask(result.data);

    setTitle("");
    setDueDate("");
    setTaskStatus("open");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-invalid={!!errors.title}
        aria-describedby={
          errors.title ? "title-error" : undefined
        }
      />
      {errors.title && (
        <p id="title-error">{errors.title[0]}</p>
      )}

      <label htmlFor="dueDate">Due date</label>
      <input
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-invalid={!!errors.dueDate}
        aria-describedby={
          errors.dueDate ? "dueDate-error" : undefined
        }
      />
      {errors.dueDate && (
        <p id="dueDate-error">{errors.dueDate[0]}</p>
      )}

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={taskStatus}
        onChange={(e) => setTaskStatus(e.target.value)}
        aria-invalid={!!errors.status}
        aria-describedby={
          errors.status ? "status-error" : undefined
        }
      >
        <option value="open">Open</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      {errors.status && (
        <p id="status-error">{errors.status[0]}</p>
      )}

      <button type="submit" disabled={title.trim() === ""}>
        Add task
      </button>
    </form>
  );
}

export default NewTaskForm;
