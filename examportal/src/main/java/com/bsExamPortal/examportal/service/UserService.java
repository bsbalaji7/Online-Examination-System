package com.bsExamPortal.examportal.service;

import com.bsExamPortal.examportal.entity.Role;
import com.bsExamPortal.examportal.entity.User;
import com.bsExamPortal.examportal.repository.RoleRepository;
import com.bsExamPortal.examportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String name, String email, String password, String rolename){
        // it will check the email if it is already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is Already Registered !!!");
        }
        // Find role from database
        Role role = roleRepository.findByRoleName(rolename)
                .orElseThrow(() -> new RuntimeException("Role is not Found"));

        // Creates the new user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        return userRepository.save(user);
    }
}
