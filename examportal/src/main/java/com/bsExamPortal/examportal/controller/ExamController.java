package com.bsExamPortal.examportal.controller;

import com.bsExamPortal.examportal.entity.Exam;
import com.bsExamPortal.examportal.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    // Create Exam
    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    // Get All Exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    // Get Exam By ID
    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    // Delete Exam
    @DeleteMapping("/{id}")
    public String deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return "Exam deleted successfully";
    }

    @PutMapping("/{id}")
    public Exam updateExam(
            @PathVariable Long id,
            @RequestBody Exam exam) {

        System.out.println("UPDATE API CALLED");

        return examService.updateExam(id, exam);
    }
}