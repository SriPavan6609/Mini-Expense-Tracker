package com.spring.miniexpensetracker.service.impl;

import com.spring.miniexpensetracker.dto.ExpenseCategoryDto;
import com.spring.miniexpensetracker.entity.ExpenseCategory;
import com.spring.miniexpensetracker.mapper.ExpenseCategoryMapper;
import com.spring.miniexpensetracker.repository.ExpenseCategoryRepository;
import com.spring.miniexpensetracker.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseCategoryServiceImpl implements ExpenseCategoryService {

    @Autowired
    private ExpenseCategoryRepository categoryRepository;

    @Override
    public List<ExpenseCategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(ExpenseCategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseCategoryDto getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(ExpenseCategoryMapper::toDto)
                .orElse(null);
    }

    @Override
    public ExpenseCategoryDto createCategory(ExpenseCategoryDto dto) {
        ExpenseCategory entity = ExpenseCategoryMapper.toEntity(dto);
        ExpenseCategory saved = categoryRepository.save(entity);
        return ExpenseCategoryMapper.toDto(saved);
    }

    @Override
    public ExpenseCategoryDto updateCategory(Long id, ExpenseCategoryDto dto) {
        ExpenseCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setCategoryName(dto.getCategoryName());
        ExpenseCategory updated = categoryRepository.save(category);
        return ExpenseCategoryMapper.toDto(updated);
    }

    @Override
    public void deleteCategory(Long id) {
        ExpenseCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }
}
