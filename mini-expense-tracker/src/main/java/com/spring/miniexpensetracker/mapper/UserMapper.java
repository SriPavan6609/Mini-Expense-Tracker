package com.spring.miniexpensetracker.mapper;

import com.spring.miniexpensetracker.dto.UserDto;
import com.spring.miniexpensetracker.dto.UserRegistrationDTO;
import com.spring.miniexpensetracker.entity.User;

public class UserMapper {

    public static UserDto toDTO(User user) {
        if (user == null) return null;

        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public static User toEntity(UserDto dto) {
        if (dto == null) return null;

        User user = new User();
        user.setUserId(dto.getUserId());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        // password intentionally not set for security reasons
        return user;
    }

    public static User toEntity(UserRegistrationDTO dto) {
        User user = new User();
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        // don't set password here unless you want to hash it here
        return user;
    }

}
