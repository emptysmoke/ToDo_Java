import { useState, useEffect, useCallback } from 'react';

import { todoService } from '../services/todoServices';
import { TodoList } from "./TodoList";
import { TaskForm } from "./TaskForm";
import { TaskFilter } from "./TaskFilter";

import type { Task } from '../types/Task';


export const TodoManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<{text: string; type: 'success' | 'error' } | null>(null);
  const [currentFilters, setCurrentFilters] = useState({ status: '', start: '', end: '', sort: 'createdAt'});

  const fetchTasks = useCallback(async (status = '', start = '', end = '', sort = 'createdAt') => {
    try{
      const data = await todoService.getTodos(status, start, end, sort);
      setTasks([...data]);
      setCurrentFilters({ status, start, end, sort });
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }, []);

  const showNotification = (text: string, type: 'success' | 'error' = 'success' ) => {
    setMessage({ text, type }); 

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleFilterChange = (status: string, start: string, end: string, sort: string) => {
    fetchTasks(status, start, end, sort);
  }

  const refreshList = () => {
    fetchTasks(currentFilters.status, currentFilters.start, currentFilters.end, currentFilters.sort);
  }

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h1>My Tasks</h1>
      {message && <div className={`alert-${message.type}`}>{message.text}</div>}

      <TaskForm 
        onTaskCreated={refreshList}
        notify={showNotification}
      />
      <hr />
      <TaskFilter
        onConditionChange={handleFilterChange}
       />
      <hr />
      <TodoList 
        tasks={tasks} 
        refreshList={refreshList} 
        notify={showNotification} 
      />
    </div>
  );
};