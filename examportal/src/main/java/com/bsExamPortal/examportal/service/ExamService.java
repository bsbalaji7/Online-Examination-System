package com.bsExamPortal.examportal.service;

import com.bsExamPortal.examportal.entity.Exam;
import com.bsExamPortal.examportal.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;

    // Create Exam
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    // Get All Exams
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Get Exam By ID
    public Exam getExamById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    // Delete Exam
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
    public Exam updateExam(Long id, Exam updatedExam) {

        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        exam.setTitle(updatedExam.getTitle());
        exam.setDescription(updatedExam.getDescription());
        exam.setDuration(updatedExam.getDuration());
        exam.setTotalMarks(updatedExam.getTotalMarks());

        return examRepository.save(exam);
    }

}

