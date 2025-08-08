package com.spring.miniexpensetracker.repository;

import com.spring.miniexpensetracker.entity.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {
}
