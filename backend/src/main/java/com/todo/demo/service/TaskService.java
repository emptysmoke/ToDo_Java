package com.todo.demo.service;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.entity.Task;
import com.todo.demo.exception.ResourceNotFoundException;
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
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID " + id + " のタスクは見つかりませんでした。"));
        task.updateFromDto(dto);
        taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID " + id + " のタスクは見つかりませんでした。"));
        taskRepository.deleteById(id);
    }
}
