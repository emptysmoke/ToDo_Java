package com.todo.demo.entity;
import com.todo.demo.dto.TaskDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate deadline;

    private Boolean completed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Task(){
    }

    @PrePersist
    public void onCreate(){
        this.completed = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

    // why void and not return Task?
    public void updateFromDto(TaskDto dto){
        this.setName(dto.getName());
        this.setDeadline(dto.getDeadline());
        this.setCompleted(dto.getCompleted());
    }
}