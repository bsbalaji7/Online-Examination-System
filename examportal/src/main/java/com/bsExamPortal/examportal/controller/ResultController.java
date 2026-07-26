package com.bsExamPortal.examportal.controller;

import com.bsExamPortal.examportal.entity.Result;
import com.bsExamPortal.examportal.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    // STUDENT ONLY
    @PostMapping("/{studentId}/{examId}")
    @PreAuthorize("hasRole('STUDENT')")
    public Result calculateResult(
            @PathVariable Long studentId,
            @PathVariable Long examId) {

        return resultService.calculateResult(studentId, examId);
    }
}