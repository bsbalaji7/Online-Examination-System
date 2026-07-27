package com.bsExamPortal.examportal.controller;

import com.bsExamPortal.examportal.dto.StudentAnswerRequest;
import com.bsExamPortal.examportal.entity.StudentAnswer;
import com.bsExamPortal.examportal.service.StudentAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-answers")
@RequiredArgsConstructor
public class StudentAnswerController {

    private final StudentAnswerService studentAnswerService;

    // STUDENT ONLY
    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public StudentAnswer submitAnswer(
            @RequestBody StudentAnswerRequest request) {

        return studentAnswerService.submitAnswer(
                request.getStudentId(),
                request.getQuestionId(),
                request.getSelectedAnswer()
        );
    }

    // STUDENT ONLY
    @GetMapping("/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<StudentAnswer> getStudentAnswers(
            @PathVariable Long studentId) {

        return studentAnswerService.getStudentAnswers(studentId);
    }
}