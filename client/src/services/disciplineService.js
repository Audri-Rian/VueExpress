import axios from 'axios'
import { endpoints } from '../config/api'

export const disciplineService = {
  async getAllDisciplines() {
    try {
      const response = await axios.get(endpoints.disciplines)
      console.log('Resposta do servidor (disciplinas):', response.data)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error)
      throw new Error(error.response?.data?.error || 'Erro ao buscar disciplinas')
    }
  },

  async getDisciplinesByCourse(courseId) {
    try {
      const response = await axios.get(`${endpoints.disciplines}/course/${courseId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar disciplinas do curso:', error)
      throw new Error(error.response?.data?.error || 'Erro ao buscar disciplinas do curso')
    }
  },

  async getDisciplineById(id) {
    try {
      const response = await axios.get(`${endpoints.disciplines}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar disciplina')
    }
  },

  async createDiscipline(disciplineData) {
    try {
      const response = await axios.post(endpoints.disciplines, disciplineData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar disciplina')
    }
  },

  async updateDiscipline(id, disciplineData) {
    try {
      const response = await axios.put(`${endpoints.disciplines}/${id}`, disciplineData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar disciplina')
    }
  },

  async deleteDiscipline(id) {
    try {
      const response = await axios.delete(`${endpoints.disciplines}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao excluir disciplina')
    }
  }
}
