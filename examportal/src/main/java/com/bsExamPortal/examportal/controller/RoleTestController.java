package com.bsExamPortal.examportal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleTestController {

    @GetMapping("/api/admin/test")
    public String adminTest() {
        return "Welcome Admin 👑";
    }

    @GetMapping("/api/student/test")
    public String studentTest() {
        return "Welcome Student 🎓";
    }
}