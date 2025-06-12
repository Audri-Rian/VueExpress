import axios from 'axios'

const API_URL = 'http://localhost:3000/api/disciplines'

export const disciplineService = {
  async getAllDisciplines() {
    try {
      const response = await axios.get(API_URL)
      console.log('Resposta do servidor (disciplinas):', response.data)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error)
      throw new Error(error.response?.data?.error || 'Erro ao buscar disciplinas')
    }
  },

  async getDisciplineById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar disciplina')
    }
  },

  async createDiscipline(disciplineData) {
    try {
      const response = await axios.post(API_URL, disciplineData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar disciplina')
    }
  },

  async updateDiscipline(id, disciplineData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, disciplineData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar disciplina')
    }
  },

  async deleteDiscipline(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao excluir disciplina')
    }
  }
}
