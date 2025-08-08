package com.spring.miniexpensetracker.service.impl;

import com.spring.miniexpensetracker.dto.ExpenseDto;
import com.spring.miniexpensetracker.dto.UserDto;
import com.spring.miniexpensetracker.entity.Expense;
import com.spring.miniexpensetracker.entity.User;
import com.spring.miniexpensetracker.mapper.ExpenseMapper;
import com.spring.miniexpensetracker.repository.ExpenseRepository;
import com.spring.miniexpensetracker.repository.UserRepository;
import com.spring.miniexpensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ExpenseDto> getExpensesByUserId(Long userId) {
        return expenseRepository.findByUserUserId(userId)
                .stream()
                .map(ExpenseMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseDto addExpense(ExpenseDto dto) {
        Expense expense = ExpenseMapper.toEntity(dto);
        return ExpenseMapper.toDTO(expenseRepository.save(expense));
    }

    @Override
    public ExpenseDto updateExpense(Long id, ExpenseDto expenseDto) {
        Optional<Expense> optional = expenseRepository.findById(id);
        if (optional.isEmpty()) throw new RuntimeException("Expense not found");

        Expense existing = optional.get();

        existing.setExpense(expenseDto.getExpense());
        existing.setExpensedate(expenseDto.getExpensedate());
        existing.setExpensecategory(expenseDto.getExpensecategory());

        if (!existing.getUser().getUserId().equals(expenseDto.getUserId())) {
            Optional<User> newUser = userRepository.findById(expenseDto.getUserId());
            if (newUser.isEmpty()) throw new RuntimeException("New user not found");
            existing.setUser(newUser.get());
        }

        Expense updated = expenseRepository.save(existing);
        return ExpenseMapper.toDTO(updated);
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
