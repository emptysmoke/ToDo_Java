import api from '../api/api';
import type { Task }  from '../types/Task';

export const todoService = {
  getTodos: async(status: string = '', start: string = '', end: string = ''): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks', {
      params: {
        completed: status, 
        startDate: start,
        endDate: end
      }});
    return response.data;
  }, 

  createTodo: async (task: Task | undefined) => {
    return await api.post('/tasks/create', task);
  }, 

  updateTodo: async (id: number | undefined, task: Task | undefined) => {
    return await api.put('/tasks/update/' + id, task);
  }, 

  deleteTodo: async (id: number | undefined) => {
    return await api.delete('/tasks/delete/' + id);
  }
}