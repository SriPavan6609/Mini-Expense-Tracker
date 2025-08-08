package com.spring.miniexpensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDto {
    private Long expenseId;
    private Long userId;
    private int expense;
    private String expensedate;
    private String expensecategory;
}
