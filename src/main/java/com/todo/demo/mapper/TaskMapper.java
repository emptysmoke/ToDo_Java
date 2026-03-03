package com.todo.demo.mapper;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.entity.Task;

import java.util.ArrayList;
import java.util.List;

public class TaskMapper {

    public static TaskDto toDto(Task task) {
        return new TaskDto(
            task.getId(),
            task.getName(),
            task.getDeadline(),
            task.isCompleted(),
            task.getCreatedAt(),
            task.getUpdatedAt()
        );
    }

    public static Task toEntity(TaskDto dto) {
        Task task = new Task();
        task.setName(dto.getName());
        task.setDeadline(dto.getDeadline());
        task.setCompleted(dto.isCompleted());
        return task;
    }

    public static List<TaskDto> toDtoList(List<Task> tasks) {
        List<TaskDto> dtoList = new ArrayList<>();
        for (Task task : tasks) {
            dtoList.add(toDto(task));
        }
        return dtoList;
    }
}