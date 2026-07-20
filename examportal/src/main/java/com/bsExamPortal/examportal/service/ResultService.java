package com.bsExamPortal.examportal.service;

import com.bsExamPortal.examportal.entity.*;
import com.bsExamPortal.examportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;
    private final StudentAnswerRepository studentAnswerRepository;
    private final UserRepository userRepository;
    private final ExamRepository examRepository;

    public Result calculateResult(Long studentId, Long examId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<StudentAnswer> answers =
                studentAnswerRepository.findByStudentId(studentId);

        int correct = 0;

        for (StudentAnswer answer : answers) {

            if (answer.getSelectedAnswer()
                    .equalsIgnoreCase(
                            answer.getQuestion().getCorrectAnswer())) {

                correct++;
            }
        }

        int total = answers.size();

        int wrong = total - correct;

        double percentage = total == 0
                ? 0
                : ((double) correct / total) * 100;

        Result result = new Result();

        result.setStudent(student);
        result.setExam(exam);

        result.setTotalQuestions(total);
        result.setCorrectAnswers(correct);
        result.setWrongAnswers(wrong);
        result.setPercentage(percentage);

        if (percentage >= 40) {
            result.setStatus("PASS");
        } else {
            result.setStatus("FAIL");
        }

        return resultRepository.save(result);
    }
}