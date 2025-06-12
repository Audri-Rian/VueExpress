import axios from 'axios'

const API_URL = 'http://localhost:3000/api/disciplines'

export const disciplineService = {
  async createDiscipline(data) {
    const response = await axios.post(API_URL, data)
    return response.data
  },

  async getAllDisciplines() {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getDisciplineById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async updateDiscipline(id, data) {
    const response = await axios.put(`${API_URL}/${id}`, data)
    return response.data
  },

  async deleteDiscipline(id) {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  },
}
