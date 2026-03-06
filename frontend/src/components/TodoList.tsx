import { useEffect, useState } from 'react';
import { todoService } from '../services/todoServices';
import type { Task } from '../types/Task';

export const TodoList = () => {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await todoService.getAllTodos();
        setTasks(data);
      } catch (err) {
        setError("タスクの取得に失敗しました。")
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>My To-Do List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} readOnly />
            <span>{task.name}</span>
            <small> [期限: {task.deadline}]</small>
          </li>
        ))}
      </ul>
    </div>
  );
};