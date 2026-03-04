package com.todo.demo.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class TaskDto {
    private Long id;

    @NotNull
    @Size(max = 20, message = "タスク名は20文字以内で記入してください。")
    private String name;

    @NotNull
    @FutureOrPresent(message = "過去の日付は設定できません。")
    private LocalDate deadline;

    private Boolean completed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public TaskDto(){
    };

    public TaskDto(Long id, String name, LocalDate deadline, Boolean completed,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.deadline = deadline;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
