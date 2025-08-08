package com.spring.miniexpensetracker.controller;

import com.spring.miniexpensetracker.dto.ExpenseDto;
import com.spring.miniexpensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/user/{userId}")
    public List<ExpenseDto> getExpensesByUser(@PathVariable Long userId) {
        return expenseService.getExpensesByUserId(userId);
    }

    @PostMapping
    public ExpenseDto addExpense(@RequestBody ExpenseDto dto) {
        return expenseService.addExpense(dto);
    }

    // here id is expenseId
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> updateExpense(@PathVariable Long id, @RequestBody ExpenseDto expenseDto) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expenseDto));
    }

    // rest api to delete an expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
