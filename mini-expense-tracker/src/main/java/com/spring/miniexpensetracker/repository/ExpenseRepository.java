package com.spring.miniexpensetracker.repository;

import com.spring.miniexpensetracker.entity.Expense;
import com.spring.miniexpensetracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    List<Expense> findByUserUserId(Long userId);
}
