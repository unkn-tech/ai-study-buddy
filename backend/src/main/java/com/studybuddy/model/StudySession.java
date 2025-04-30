package com.studybuddy.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "study_sessions")
public class StudySession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private Integer duration;
    private String notes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
} 