import { todoService } from '../services/todoServices';
import type { Task } from '../types/Task';

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

  return (
    <div>
      <h2>ToDo リスト</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)}/>
            <span>{task.name}</span>
            <small> [期限: {task.deadline}]</small>
            <button type="button" onClick={() => deleteTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};