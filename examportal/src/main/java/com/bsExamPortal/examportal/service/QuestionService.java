package com.bsExamPortal.examportal.service;

import com.bsExamPortal.examportal.entity.Exam;
import com.bsExamPortal.examportal.entity.Question;
import com.bsExamPortal.examportal.repository.ExamRepository;
import com.bsExamPortal.examportal.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;

    // Add Question
    public Question addQuestion(Long examId, Question question) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        question.setExam(exam);

        return questionRepository.save(question);
    }

    // Get Questions by Exam
    public List<Question> getQuestionsByExam(Long examId) {
        return questionRepository.findByExamId(examId);
    }

    // Update Question
    public Question updateQuestion(Long id, Question updatedQuestion) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setQuestionText(updatedQuestion.getQuestionText());
        question.setOptionA(updatedQuestion.getOptionA());
        question.setOptionB(updatedQuestion.getOptionB());
        question.setOptionC(updatedQuestion.getOptionC());
        question.setOptionD(updatedQuestion.getOptionD());
        question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());

        return questionRepository.save(question);
    }

    // Delete Question
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}