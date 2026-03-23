import { useState, useEffect } from 'react';

import { todoService } from '../services/todoServices';
import { TodoList } from "./TodoList";
import { TaskForm } from "./TaskForm";
import { TaskFilter } from "./TaskFilter";

import type { Task } from '../types/Task';


export const TodoManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<{text: string; type: 'success' | 'error' } | null>(null);

  const fetchAllTasks = async () => {
    const data = await todoService.getAllTodos();
    setTasks([...data]);
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success' ) => {
    setMessage({ text, type }); 

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await fetchAllTasks();
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>My Tasks</h1>
      {message && <div className={`alert-${message.type}`}>{message.text}</div>}

      <TaskForm 
        onTaskCreated={fetchAllTasks}
        notify={showNotification}
      />
      <hr />
      <TaskFilter
        onConditionChange={fetchAllTasks}
       />
      <hr />
      <TodoList 
        tasks={tasks} 
        refreshList={fetchAllTasks} 
        notify={showNotification} 
      />
    </div>
  );
};