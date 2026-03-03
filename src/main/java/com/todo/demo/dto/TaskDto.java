package com.todo.demo.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class TaskDto {
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private LocalDate deadline;

    private boolean completed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public TaskDto(){
    };

    public TaskDto(Long id, @NonNull String name, @NonNull LocalDate deadline, boolean completed,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.deadline = deadline;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
