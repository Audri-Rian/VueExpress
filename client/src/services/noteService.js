import axios from 'axios';
import { endpoints } from '../config/api';

const noteService = {
  async createNote(noteData) {
    try {
      const response = await axios.post(endpoints.notes.base, noteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar nota');
    }
  },

  async updateNote(noteId, noteData) {
    try {
      const response = await axios.put(`${endpoints.notes.base}/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar nota');
    }
  },

  async getNotesByCourseAndDiscipline(courseId, disciplineId) {
    try {
      const response = await axios.get(endpoints.notes.byCourseAndDiscipline(courseId, disciplineId));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar notas da disciplina');
    }
  },

  async getNotesByStudent(studentId) {
    try {
      const response = await axios.get(endpoints.notes.byStudent(studentId));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar notas do aluno');
    }
  },

  async bulkUpdateNotes(notesData) {
    try {
      const response = await axios.post(endpoints.notes.bulk, { notes: notesData });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar notas em lote');
    }
  }
};

export default noteService; 