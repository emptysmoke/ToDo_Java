package com.todo.demo.service;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.entity.Task;
import com.todo.demo.mapper.TaskMapper;
import com.todo.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Autowired
    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    public List<TaskDto> getAllTasks() {
        return taskMapper.toDtoList(taskRepository.findAllByOrderByCompletedAscDeadlineAsc());
    }

    public void createTask(TaskDto dto) {
        taskRepository.save(taskMapper.toEntity(dto));
    }

    public void updateTask(Long id, TaskDto dto) {
        // error handling is necessary because id might retrieve null, not only Task
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.updateFromDto(dto);
        taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
