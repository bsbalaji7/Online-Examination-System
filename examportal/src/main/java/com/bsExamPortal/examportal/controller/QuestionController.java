package com.bsExamPortal.examportal.controller;

import com.bsExamPortal.examportal.entity.Question;
import com.bsExamPortal.examportal.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // ADMIN ONLY
    @PostMapping("/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Question addQuestion(
            @PathVariable Long examId,
            @RequestBody Question question) {

        return questionService.addQuestion(examId, question);
    }

    // ADMIN & STUDENT
    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    public List<Question> getQuestions(
            @PathVariable Long examId) {

        return questionService.getQuestionsByExam(examId);
    }

    // ADMIN ONLY
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Question updateQuestion(
            @PathVariable Long id,
            @RequestBody Question question) {

        return questionService.updateQuestion(id, question);
    }

    // ADMIN ONLY
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteQuestion(@PathVariable Long id) {

        questionService.deleteQuestion(id);

        return "Question deleted successfully";
    }
}