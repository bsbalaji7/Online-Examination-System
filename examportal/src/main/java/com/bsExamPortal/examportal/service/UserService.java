package com.bsExamPortal.examportal.service;

import com.bsExamPortal.examportal.entity.Role;
import com.bsExamPortal.examportal.entity.User;
import com.bsExamPortal.examportal.repository.RoleRepository;
import com.bsExamPortal.examportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // REGISTER METHOD
    public User registerUser(String name, String email, String password, String rolename) {

        // Check if email exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is Already Registered !!!");
        }

        // Find role
        Role role = roleRepository.findByRoleName(rolename)
                .orElseThrow(() -> new RuntimeException("Role is not Found"));

        // Create user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        return userRepository.save(user);
    }

    // LOGIN METHOD (SEPARATE METHOD)
    public User loginUser(String email, String password) {

        // Find user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }
}