package com.spring.miniexpensetracker.service;

import com.spring.miniexpensetracker.dto.ExpenseDto;

import java.util.List;

public interface ExpenseService {
    List<ExpenseDto> getExpensesByUserId(Long userId);
    ExpenseDto addExpense(ExpenseDto dto);
    ExpenseDto updateExpense(Long id, ExpenseDto expenseDto);
    void deleteExpense(Long id);
}
