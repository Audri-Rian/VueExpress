import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const noteService = {
  async createNote(noteData) {
    try {
      const response = await axios.post(`${API_URL}/notes`, noteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar nota');
    }
  },

  async updateNote(noteId, noteData) {
    try {
      const response = await axios.put(`${API_URL}/notes/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar nota');
    }
  },

  async getNotesByCourseAndDiscipline(courseId, disciplineId) {
    try {
      const response = await axios.get(`${API_URL}/notes/course/${courseId}/discipline/${disciplineId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar notas da disciplina');
    }
  },

  async getNotesByStudent(studentId) {
    try {
      const response = await axios.get(`${API_URL}/notes/student/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar notas do aluno');
    }
  },

  async bulkUpdateNotes(notesData) {
    try {
      const response = await axios.post(`${API_URL}/notes/bulk`, { notes: notesData });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar notas em lote');
    }
  }
};

export default noteService; 