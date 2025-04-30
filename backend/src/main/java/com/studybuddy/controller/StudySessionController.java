package com.studybuddy.controller;

import com.studybuddy.model.StudySession;
import com.studybuddy.service.StudySessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class StudySessionController {
    private final StudySessionService service;

    @Autowired
    public StudySessionController(StudySessionService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<StudySession>> getAllSessions() {
        return ResponseEntity.ok(service.getAllSessions());
    }

    @PostMapping
    public ResponseEntity<StudySession> createSession(@RequestBody StudySession session) {
        return ResponseEntity.ok(service.saveSession(session));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        service.deleteSession(id);
        return ResponseEntity.ok().build();
    }
} 