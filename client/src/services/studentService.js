import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const studentService = {
  async createStudent(studentData) {
    try {
      const response = await axios.post(`${API_URL}/registerAluno`, studentData)
      return response.data
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status de erro
        throw error
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw new Error('Não foi possível conectar ao servidor. Por favor, verifique sua conexão.')
      } else {
        // Erro na configuração da requisição
        throw new Error('Erro ao processar a requisição.')
      }
    }
  },

  async getAllStudents() {
    try {
      const response = await axios.get(`${API_URL}/students`)
      return response.data
    } catch (error) {
      if (error.response) {
        throw error
      } else if (error.request) {
        throw new Error('Não foi possível conectar ao servidor. Por favor, verifique sua conexão.')
      } else {
        throw new Error('Erro ao processar a requisição.')
      }
    }
  },

  async getStudentById(id) {
    try {
      const response = await axios.get(`${API_URL}/students/${id}`)
      return response.data
    } catch (error) {
      if (error.response) {
        throw error
      } else if (error.request) {
        throw new Error('Não foi possível conectar ao servidor. Por favor, verifique sua conexão.')
      } else {
        throw new Error('Erro ao processar a requisição.')
      }
    }
  },

  async updateStudent(id, studentData) {
    try {
      const response = await axios.put(`${API_URL}/students/${id}`, studentData)
      return response.data
    } catch (error) {
      if (error.response) {
        throw error
      } else if (error.request) {
        throw new Error('Não foi possível conectar ao servidor. Por favor, verifique sua conexão.')
      } else {
        throw new Error('Erro ao processar a requisição.')
      }
    }
  },

  async deleteStudent(id) {
    try {
      const response = await axios.delete(`${API_URL}/students/${id}`)
      return response.data
    } catch (error) {
      if (error.response) {
        throw error
      } else if (error.request) {
        throw new Error('Não foi possível conectar ao servidor. Por favor, verifique sua conexão.')
      } else {
        throw new Error('Erro ao processar a requisição.')
      }
    }
  },
}
