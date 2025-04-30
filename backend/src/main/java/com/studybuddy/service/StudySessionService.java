package com.studybuddy.service;

import com.studybuddy.model.StudySession;
import com.studybuddy.repository.StudySessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudySessionService {
    private final StudySessionRepository repository;

    @Autowired
    public StudySessionService(StudySessionRepository repository) {
        this.repository = repository;
    }

    public List<StudySession> getAllSessions() {
        return repository.findAll();
    }

    public StudySession saveSession(StudySession session) {
        return repository.save(session);
    }

    public void deleteSession(Long id) {
        repository.deleteById(id);
    }
} 