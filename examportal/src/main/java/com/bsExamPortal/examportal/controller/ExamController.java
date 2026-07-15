package com.bsExamPortal.examportal.controller;

import com.bsExamPortal.examportal.entity.Exam;
import com.bsExamPortal.examportal.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    // ==========================
    // ADMIN ONLY
    // Create Exam
    // ==========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Exam createExam(@Valid @RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    // ==========================
    // ADMIN & STUDENT
    // View All Exams
    // ==========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    // ==========================
    // ADMIN & STUDENT
    // View Exam By ID
    // ==========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    // ==========================
    // ADMIN ONLY
    // Update Exam
    // ==========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Exam updateExam(
            @PathVariable Long id,
            @Valid @RequestBody Exam exam) {

        return examService.updateExam(id, exam);
    }

    // ==========================
    // ADMIN ONLY
    // Delete Exam
    // ==========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteExam(@PathVariable Long id) {

        examService.deleteExam(id);

        return "Exam deleted successfully";
    }
}