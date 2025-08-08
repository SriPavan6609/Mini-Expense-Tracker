package com.spring.miniexpensetracker.service;

import com.spring.miniexpensetracker.dto.LoginRequest;
import com.spring.miniexpensetracker.dto.UserDto;
import com.spring.miniexpensetracker.dto.UserRegistrationDTO;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long userId);
    UserDto createUser(UserRegistrationDTO registrationDTO);
    UserDto updateUser(Long id, UserDto dto);
    void deleteUser(Long id);

    // In UserService interface
    UserDto validateUser(LoginRequest loginRequest);
    UserDto getUserByEmail(String email);


}
