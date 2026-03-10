import { useState } from 'react';
import { todoService } from '../services/todoServices';

interface TaskFormProps {
  onTaskCreated: () => Promise<void>;
  notify: (text: string, type?: 'success' | 'error') => void;
}

export const TaskForm = ({ onTaskCreated, notify }: TaskFormProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (formData: FormData) => {
    setIsSubmitting(true);
    const newTask = {
      name: formData.get("name") as string, 
      deadline: formData.get("deadline") as string
    };
    try {
      await todoService.createTodo(newTask);
      await onTaskCreated();
      notify("追加しました！");
    } catch {
      notify("追加に失敗しました", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2>新規タスク</h2>
      <form action={submit}>
        <input
          name="name"
          required
          maxLength={20}
          placeholder="タスクを入力..."
        />
        <input
          name="deadline"
          required
          type="date"
          min={today}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "追加中..." : "追加"}</button>
      </form>
    </div>
  );
}