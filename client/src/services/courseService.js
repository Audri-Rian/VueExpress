// Arquivo destinado para a configuração de funcionamento da API com o controller aqui nois tem tudo para configuração
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const courseService = {
    // Configuração de novo curso caraio
    async createCourse(courseData) {
        try {
            const response = await axios.post(`${API_URL}/courses`, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao criar curso');
        }
    },

    // BCuscar novo curso
    async getAllCourses() {
        try {
            const response = await axios.get(`${API_URL}/courses`);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Erro ao buscar cursos');
            } else if (error.request) {
                throw new Error('Erro de conexão ao buscar cursos');
            } else {
                throw new Error('Erro ao processar requisição');
            }
        }
    },

    // Buscar um curso caraio
    async getCourseById(id) {
        try {
            const response = await axios.get(`${API_URL}/courses/${id}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Erro ao buscar curso');
            } else if (error.request) {
                throw new Error('Erro de conexão ao buscar curso');
            } else {
                throw new Error('Erro ao processar requisição');
            }
        }
    },

    // Att um curso 
    async updateCourse(id, courseData) {
        try {
            const response = await axios.put(`${API_URL}/courses/${id}`, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao atualizar curso');
        }
    },

    // Deletar um curso
    async deleteCourse(id) {
        try {
            const response = await axios.delete(`${API_URL}/courses/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao excluir curso');
        }
    }
}; 