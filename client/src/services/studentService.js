import axios from 'axios'
import { endpoints } from '../config/api'

export const studentService = {
  async createStudent(studentData) {
    try {
      const response = await axios.post(endpoints.students.register, studentData)
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
      const response = await axios.get(endpoints.students.base)
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
      const response = await axios.get(`${endpoints.students.base}/${id}`)
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
      const response = await axios.put(`${endpoints.students.base}/${id}`, studentData)
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
      const response = await axios.delete(`${endpoints.students.base}/${id}`)
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
