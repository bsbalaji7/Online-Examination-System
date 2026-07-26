package com.bsExamPortal.examportal.repository;

import com.bsExamPortal.examportal.entity.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentAnswerRepository
        extends JpaRepository<StudentAnswer, Long> {

    List<StudentAnswer> findByStudentId(Long studentId);

}