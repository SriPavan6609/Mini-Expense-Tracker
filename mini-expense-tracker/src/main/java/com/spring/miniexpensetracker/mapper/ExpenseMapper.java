package com.spring.miniexpensetracker.mapper;

import com.spring.miniexpensetracker.dto.ExpenseDto;
import com.spring.miniexpensetracker.entity.Expense;

public class ExpenseMapper {

    public static ExpenseDto toDTO(Expense expense) {
        if (expense == null) return null;

        ExpenseDto dto = new ExpenseDto();
        dto.setExpenseId(expense.getExpenseId());
        dto.setExpense(expense.getExpense());
        dto.setExpensedate(expense.getExpensedate());
        dto.setExpensecategory(expense.getExpensecategory());

        if (expense.getUser() != null) {
            dto.setUserId(expense.getUser().getUserId());
        }

        return dto;
    }

    public static Expense toEntity(ExpenseDto dto) {
        if (dto == null) return null;

        Expense expense = new Expense();
        expense.setExpenseId(dto.getExpenseId());
        expense.setExpense(dto.getExpense());
        expense.setExpensedate(dto.getExpensedate());
        expense.setExpensecategory(dto.getExpensecategory());

        // Only set user with ID — actual user should be fetched from DB in service layer
        if (dto.getUserId() != null) {
            var user = new com.spring.miniexpensetracker.entity.User();
            user.setUserId(dto.getUserId());
            expense.setUser(user);
        }

        return expense;
    }
}
