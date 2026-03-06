import api from '../api/api';
import type { Task }  from '../types/Task';

export const todoService = {
  getAllTodos: async(): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  }
}