package com.spring.miniexpensetracker.mapper;

import com.spring.miniexpensetracker.dto.ExpenseCategoryDto;
import com.spring.miniexpensetracker.entity.ExpenseCategory;

public class ExpenseCategoryMapper {

    public static ExpenseCategoryDto toDto(ExpenseCategory entity) {
        if (entity == null) return null;
        ExpenseCategoryDto dto = new ExpenseCategoryDto();
        dto.setCategoryId(entity.getCategoryId());
        dto.setCategoryName(entity.getCategoryName());
        return dto;
    }

    public static ExpenseCategory toEntity(ExpenseCategoryDto dto) {
        if (dto == null) return null;
        ExpenseCategory entity = new ExpenseCategory();
        entity.setCategoryId(dto.getCategoryId());
        entity.setCategoryName(dto.getCategoryName());
        return entity;
    }

}
