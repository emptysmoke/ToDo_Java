export interface Task {
  id?: number;
  name: string; 
  deadline: string; // JSON dates come as strings
  completed?: boolean;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  message: string; 
  errors?: Record<string, string> // to catch validation messages
}