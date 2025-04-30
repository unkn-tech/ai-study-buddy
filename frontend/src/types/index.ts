export interface User {
  id: number;
  username: string;
  email: string;
}

export interface StudySession {
  id: number;
  topic: string;
  content: string;
  userId: number;
  createdAt: string;
  questions?: Question[];
}

export interface Question {
  id: number;
  content: string;
  answer: string;
  sessionId: number;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  questions?: Question[];
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  userId: number;
  createdAt: string;
}

export interface Note {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  files?: File[];
}

export interface File {
  id: number;
  name: string;
  url: string;
  noteId: number;
  createdAt: string;
} 