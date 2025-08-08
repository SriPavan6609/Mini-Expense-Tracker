package com.spring.miniexpensetracker.service;

import com.spring.miniexpensetracker.dto.ExpenseCategoryDto;

import java.util.List;

public interface ExpenseCategoryService {
    List<ExpenseCategoryDto> getAllCategories();
    ExpenseCategoryDto getCategoryById(Long id);
    ExpenseCategoryDto createCategory(ExpenseCategoryDto dto);
    ExpenseCategoryDto updateCategory(Long id, ExpenseCategoryDto dto);
    void deleteCategory(Long id);
}
