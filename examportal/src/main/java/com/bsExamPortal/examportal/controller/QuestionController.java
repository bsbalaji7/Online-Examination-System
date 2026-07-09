package com.bsExamPortal.examportal.controller;

import com.bsExamPortal.examportal.entity.Question;
import com.bsExamPortal.examportal.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // Add Question to an Exam
    @PostMapping("/exam/{examId}")
    public Question addQuestion(
            @PathVariable Long examId,
            @RequestBody Question question) {

        return questionService.addQuestion(examId, question);
    }

    // Get Questions by Exam
    @GetMapping("/exam/{examId}")
    public List<Question> getQuestions(@PathVariable Long examId) {
        return questionService.getQuestionsByExam(examId);
    }

    // Update Question
    @PutMapping("/{id}")
    public Question updateQuestion(
            @PathVariable Long id,
            @RequestBody Question question) {

        return questionService.updateQuestion(id, question);
    }

    // Delete Question
    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {

        questionService.deleteQuestion(id);

        return "Question deleted successfully";
    }
}