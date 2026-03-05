package com.todo.demo.mapper;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.entity.Task;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// what does Component do?
@Component
public class TaskMapper {

    public TaskDto toDto(Task task) {
        return new TaskDto(
            task.getId(),
            task.getName(),
            task.getDeadline(),
            task.getCompleted(),
            task.getCreatedAt(),
            task.getUpdatedAt()
        );
    }

    public Task toEntity(TaskDto dto) {
        Task task = new Task();
        task.setName(dto.getName());
        task.setDeadline(dto.getDeadline());
        task.setCompleted(dto.getCompleted());
        return task;
    }

    public List<TaskDto> toDtoList(List<Task> tasks) {
        List<TaskDto> dtoList = new ArrayList<>();
        for (Task task : tasks) {
            dtoList.add(toDto(task));
        }
        return dtoList;
    }
}