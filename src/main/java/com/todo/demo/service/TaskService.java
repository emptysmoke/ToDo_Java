package com.todo.demo.service;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.mapper.TaskMapper;
import com.todo.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDto> getAllTasks() {
        return TaskMapper.toDtoList(taskRepository.findAll());
    }

    public void createTask(TaskDto dto) {
        taskRepository.save(TaskMapper.toEntity(dto));
    }

    // TO DO
//    public void updateTask(TaskDto dto) { taskRepository.sa}

    public void deleteTask(Long id) { taskRepository.deleteById(id);}
}
