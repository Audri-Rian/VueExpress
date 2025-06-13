import axios from 'axios'
import { endpoints } from '../config/api'

export const frequencyService = {
  async createFrequency(frequencyData) {
    try {
      console.log('Criando frequência com dados:', frequencyData)
      const response = await axios.post(endpoints.frequencies, frequencyData)
      console.log('Resposta do servidor (criar frequência):', response.data)
      return response.data
    } catch (error) {
      console.error('Erro ao criar frequência:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw new Error(error.response?.data?.error || 'Erro ao criar frequência')
    }
  },

  async getFrequenciesByClassAndDate(classId, date) {
    try {
      console.log('Buscando frequências para:', { classId, date })
      const response = await axios.get(`${endpoints.frequencies}/class/${classId}/date/${date}`)
      console.log('Resposta do servidor:', response.data)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar frequências:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      if (error.response?.status === 404) {
        return []
      }
      throw new Error(error.response?.data?.error || 'Erro ao buscar frequências')
    }
  },

  async updateFrequency(id, frequencyData) {
    try {
      const response = await axios.put(`${endpoints.frequencies}/${id}`, frequencyData)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar frequência:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Erro ao atualizar frequência')
    }
  },

  async deleteFrequency(id) {
    try {
      const response = await axios.delete(`${endpoints.frequencies}/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao excluir frequência:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Erro ao excluir frequência')
    }
  }
} 