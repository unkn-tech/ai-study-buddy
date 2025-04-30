package com.studybuddy.controller;

import com.studybuddy.model.User;
import com.studybuddy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("/{userId}/study-buddy-name")
    public ResponseEntity<User> updateStudyBuddyName(
            @PathVariable Long userId,
            @RequestParam String studyBuddyName) {
        return ResponseEntity.ok(userService.updateStudyBuddyName(userId, studyBuddyName));
    }

    @PutMapping("/{userId}/theme")
    public ResponseEntity<User> updateTheme(
            @PathVariable Long userId,
            @RequestParam String theme) {
        return ResponseEntity.ok(userService.updateTheme(userId, theme));
    }
} 