package com.bsExamPortal.examportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_answers")
@Data
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String selectedAnswer;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}