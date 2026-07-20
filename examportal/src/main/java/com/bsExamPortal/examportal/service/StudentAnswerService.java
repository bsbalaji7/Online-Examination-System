package com.bsExamPortal.examportal.service;

import com.bsExamPortal.examportal.entity.Question;
import com.bsExamPortal.examportal.entity.StudentAnswer;
import com.bsExamPortal.examportal.entity.User;
import com.bsExamPortal.examportal.repository.QuestionRepository;
import com.bsExamPortal.examportal.repository.StudentAnswerRepository;
import com.bsExamPortal.examportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentAnswerService {

    private final StudentAnswerRepository studentAnswerRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    // Submit Answer
    public StudentAnswer submitAnswer(
            Long studentId,
            Long questionId,
            String selectedAnswer) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        StudentAnswer answer = new StudentAnswer();
        answer.setStudent(student);
        answer.setQuestion(question);
        answer.setSelectedAnswer(selectedAnswer);

        return studentAnswerRepository.save(answer);
    }

    // Get Answers of Student
    public List<StudentAnswer> getStudentAnswers(Long studentId) {
        return studentAnswerRepository.findByStudentId(studentId);
    }
}