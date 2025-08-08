package com.spring.miniexpensetracker.service.impl;

import com.spring.miniexpensetracker.dto.LoginRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.spring.miniexpensetracker.dto.UserDto;
import com.spring.miniexpensetracker.dto.UserRegistrationDTO;
import com.spring.miniexpensetracker.entity.User;
import com.spring.miniexpensetracker.mapper.UserMapper;
import com.spring.miniexpensetracker.repository.UserRepository;
import com.spring.miniexpensetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(UserMapper::toDTO)
                .orElse(null);
    }

    @Override
    public UserDto createUser(UserRegistrationDTO registrationDTO) {
        User user = UserMapper.toEntity(registrationDTO);
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        User saved = userRepository.save(user);
        return UserMapper.toDTO(saved);
    }

    @Override
    public UserDto updateUser(Long id, UserDto dto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFirstname(dto.getFirstname());
        existingUser.setLastname(dto.getLastname());
        existingUser.setEmail(dto.getEmail());
        // Don’t allow password update here

        User updatedUser = userRepository.save(existingUser);
        return UserMapper.toDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDto validateUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return UserMapper.toDTO(user);
        }
        return null;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) return null;
        return UserMapper.toDTO(user);
    }



}
