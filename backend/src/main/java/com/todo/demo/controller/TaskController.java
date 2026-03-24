package com.todo.demo.controller;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.entity.Task;
import com.todo.demo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;
    @Autowired
    public TaskController(TaskService taskService) {this.taskService = taskService;}

    @GetMapping
    public List<TaskDto> getTasks(
            @RequestParam(required = false) String completed,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {
        Boolean completedBoolean = (completed != null && !completed.isEmpty()) ? Boolean.valueOf(completed) : null;
//        if (completed == null || completed.isEmpty()) {
//            return taskService.getTasks();
//        }
        return taskService.getTasksByConditions(completedBoolean, start, end);
    }

    @PostMapping("/create")
    public Task createTask(@Valid @RequestBody TaskDto dto) {
        return taskService.createTask(dto);
    }

    @PutMapping("/update/{id}")
    public Task updateTask(@PathVariable Long id, @Valid @RequestBody TaskDto dto) {
        return taskService.updateTask(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "削除されました。";
    }
}
