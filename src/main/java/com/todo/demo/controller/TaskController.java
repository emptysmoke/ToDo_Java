package com.todo.demo.controller;

import com.todo.demo.dto.TaskDto;
import com.todo.demo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    @Autowired
    public TaskController(TaskService taskService) {this.taskService = taskService;}

    @GetMapping
    public List<TaskDto> getAll() {
        return taskService.getAllTasks();
    }

    @PostMapping("/create")
    public String createTask(@Valid @RequestBody TaskDto dto) {
        taskService.createTask(dto);
        return "タスクの追加に成功しました。";
    }

    @PutMapping("/update/{id}")
    public String updateTask(@PathVariable Long id, @Valid @RequestBody TaskDto dto) {
        taskService.updateTask(id, dto);
        return "タスクが更新されました。";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "削除されました。";
    }
}
