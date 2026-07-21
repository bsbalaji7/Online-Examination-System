package com.bsExamPortal.examportal.dto;

import lombok.Data;

@Data
public class StudentAnswerRequest {

    private Long studentId;

    private Long questionId;

    private String selectedAnswer;
}