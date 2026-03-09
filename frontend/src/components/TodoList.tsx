import { useEffect, useState } from 'react';
import { todoService, updateService } from '../services/todoServices';
import type { Task } from '../types/Task';

export const TodoList = () => {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  // const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchAllTasks = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTasks((prevTasks) => {
        const newData = [...data];
        return newData
      });
    } catch (err) {
      setError("タスクの取得に失敗しました。")
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      await fetchAllTasks();
    };

    fetchTasks();
  }, []);

    const toggleTask = async (id: number | undefined) => {
      if(!id) return;
      const currentTask = tasks.find(t => t.id === id);
      if (!currentTask) return;
      try {
        const updated = {...currentTask, completed: !currentTask.completed};
        await updateService.updateTodo(id, updated);
        await fetchAllTasks();
      } catch (err) {
        setError("タスクの更新に失敗しました。")
      }
    };

  // function getTaskbyId(id: number | undefined, tasks: Task[]) {
  //   return tasks.find(task => task.id === id)
  //   };

  // if (loading) return <p>Loading</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>ToDo リスト</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)}/>
            <span>{task.name}</span>
            <small> [期限: {task.deadline}]</small>
          </li>
        ))}
      </ul>
    </div>
  );
};