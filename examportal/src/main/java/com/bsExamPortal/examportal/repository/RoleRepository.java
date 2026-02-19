package com.bsExamPortal.examportal.repository;

import com.bsExamPortal.examportal.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(String rolename);
}
