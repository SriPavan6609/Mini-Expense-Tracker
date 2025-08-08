package com.spring.miniexpensetracker.controller;

import com.spring.miniexpensetracker.dto.ExpenseCategoryDto;
import com.spring.miniexpensetracker.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryService categoryService;

    @GetMapping
    public List<ExpenseCategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Rest api to get category by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseCategoryDto> getCategoryById(@PathVariable Long id) {
        ExpenseCategoryDto dto = categoryService.getCategoryById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    // Rest api to create a new category
    @PostMapping
    public ResponseEntity<ExpenseCategoryDto> createCategory(@RequestBody ExpenseCategoryDto categoryDto) {
        ExpenseCategoryDto created = categoryService.createCategory(categoryDto);
        return ResponseEntity.ok(created);
    }

    // Rest api to update category
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseCategoryDto> updateCategory(@PathVariable Long id,
                                                             @RequestBody ExpenseCategoryDto categoryDto) {
        try {
            ExpenseCategoryDto updated = categoryService.updateCategory(id, categoryDto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete category
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
