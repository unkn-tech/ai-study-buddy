import axios from 'axios';
import { StudySession, Question, AIResponse, Flashcard, Note, File } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studyService = {
  // Study Sessions
  createSession: (topic: string, content: string) =>
    api.post<StudySession>('/sessions', { topic, content }),
  
  getSessions: () => 
    api.get<StudySession[]>('/sessions'),
  
  getSession: (id: number) =>
    api.get<StudySession>(`/sessions/${id}`),

  // AI Interactions
  generateQuestions: (sessionId: number) =>
    api.post<Question[]>(`/sessions/${sessionId}/questions`),
  
  getAIFeedback: (content: string) =>
    api.post<AIResponse>('/ai/feedback', { content }),
  
  askQuestion: (question: string) =>
    api.post<AIResponse>('/ai/ask', { question }),
};

export default api;

// Study Session APIs
export const getStudySessions = async (): Promise<StudySession[]> => {
  const response = await fetch(`${API_BASE_URL}/study-sessions`);
  if (!response.ok) {
    throw new Error('Failed to fetch study sessions');
  }
  return response.json();
};

export const createStudySession = async (session: Omit<StudySession, 'id'>): Promise<StudySession> => {
  const response = await fetch(`${API_BASE_URL}/study-sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(session),
  });
  if (!response.ok) {
    throw new Error('Failed to create study session');
  }
  return response.json();
};

// Flashcard APIs
export const getFlashcards = async (): Promise<Flashcard[]> => {
  const response = await fetch(`${API_BASE_URL}/flashcards`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
};

export const createFlashcard = async (flashcard: Omit<Flashcard, 'id'>): Promise<Flashcard> => {
  const response = await fetch(`${API_BASE_URL}/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flashcard),
  });
  if (!response.ok) {
    throw new Error('Failed to create flashcard');
  }
  return response.json();
};

// Note APIs
export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${API_BASE_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return response.json();
};

// File APIs
export const uploadFile = async (file: globalThis.File, noteId: number): Promise<File> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('noteId', noteId.toString());

  const response = await fetch(`${API_BASE_URL}/files`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
  return response.json();
}; 