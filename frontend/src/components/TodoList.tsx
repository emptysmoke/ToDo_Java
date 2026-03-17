import { todoService } from '../services/todoServices';
import type { Task } from '../types/Task';
import { useRef } from 'react';

interface TodoListProps {
  tasks: Task[];
  refreshList: () => Promise<void>;
  notify: (text: string, type?: 'success' | 'error') => void;
}

export const TodoList = ({ tasks, refreshList, notify }: TodoListProps) => {

  const toggleTask = async (id: number | undefined) => {
    if(!id) return;

    const currentTask = tasks.find(t => t.id === id);
    if(!currentTask) return;

    try {
      const updated = {...currentTask, completed: !currentTask.completed};
      await todoService.updateTodo(id, updated);
      await refreshList();
      notify("更新しました！");
    } catch (err) {
      notify("更新に失敗しました", "error");
    }
  };

  const deleteTask = async (id: number | undefined) => {
    if(!id) return;

    const confirmed = window.confirm("このタスクを削除してもよろしいですか？");
    if(!confirmed) return;

    try {
      await todoService.deleteTodo(id);
      await refreshList();
      notify("削除しました！");
    } catch {
      notify("削除に失敗しました", "error");
    }
  }

  // TODO: redundant. Create a function which will handle the repetative part.
  const updateTask = async (id: number | undefined) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    if(!id) return;

    const currentTask = tasks.find(t => t.id === id);
    if(!currentTask) return;

    const newName = nameInputRef.current?.value;
    const newDeadline = dateInputRef.current?.value;

    if (newName && newDeadline) {
      try {
        const updated = {...currentTask, name: newName, deadline: newDeadline};
        await todoService.updateTodo(id, updated);
        await refreshList();
        notify("更新しました！");
      } catch (err) {
        notify("更新に失敗しました", "error");
      }
    }
  }

  return (
    <div>
      <h2>ToDo リスト</h2>
      {tasks.length === 0 ? (
        <p>タスクがありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)}/>
              <input name="name" type="text" defaultValue={task.name}></input>
              <span>期限：</span><input name="deadline" type="date" defaultValue={task.deadline}></input>
              <button type="button" onClick={() => updateTask(task.id)}>修正</button>
              <button type="button" onClick={() => deleteTask(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};