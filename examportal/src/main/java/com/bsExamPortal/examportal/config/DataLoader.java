package com.bsExamPortal.examportal.config;

import com.bsExamPortal.examportal.entity.Role;
import com.bsExamPortal.examportal.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
@RequiredArgsConstructor

public class DataLoader {
    private final RoleRepository roleRepository;

    @PostConstruct
    public void loadRoles() {

        if (roleRepository.findByRoleName("ADMIN").isEmpty()){
            Role admin = new Role();
            admin.setRoleName("ADMIN");
            roleRepository.save(admin);
        }

        if (roleRepository.findByRoleName("STUDENT").isEmpty()){
            Role student = new Role();
            student.setRoleName("STUDENT");
            roleRepository.save(student);
        }
    }
}
