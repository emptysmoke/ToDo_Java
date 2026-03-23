package com.todo.demo.service;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.entity.Task;
import com.todo.demo.exception.ResourceNotFoundException;
import com.todo.demo.mapper.TaskMapper;
import com.todo.demo.repository.TaskRepository;
import jakarta.transaction.Transactional;
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

    public List<TaskDto> getTasks() {
        return taskMapper.toDtoList(taskRepository.findAllByOrderByCompletedAscDeadlineAsc());
    }

    public List<TaskDto> getTasksByConditions(boolean completed) {
        return taskMapper.toDtoList(taskRepository.findAllByCompleted(completed));
    }

    @Transactional
    public Task createTask(TaskDto dto) {
        return taskRepository.save(taskMapper.toEntity(dto));
    }

    @Transactional
    public Task updateTask(Long id, TaskDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID " + id + " のタスクは見つかりませんでした。"));
        task.updateFromDto(dto);
        return taskRepository.saveAndFlush(task);
    }

    public void deleteTask(Long id) {
        taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID " + id + " のタスクは見つかりませんでした。"));
        taskRepository.deleteById(id);
    }
}
