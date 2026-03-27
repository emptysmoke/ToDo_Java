package com.todo.demo.repository;

import com.todo.demo.entity.Task;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

//    List<Task> findAllByOrderByCompletedAscDeadlineAsc();
    List<Task> findAllByCompleted(Boolean completed);

    @Query("SELECT t FROM Task t WHERE " +
            "(cast(:completed as boolean) IS NULL OR t.completed = :completed) AND " +
            "(cast(:start as localdate) IS NULL OR t.deadline >= :start) AND " +
            "(cast(:end as localdate) IS NULL OR t.deadline <= :end)")
    List<Task> findWithFilters(
            @Param("completed") Boolean completed,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("sortBy") String sortBy
    );
}