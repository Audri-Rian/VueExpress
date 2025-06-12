// Arquivo destinado para a configuração de funcionamento da API com o controller aqui nois tem tudo para configuração
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/courses';

export const courseService = {
    // Configuração de novo curso caraio
    async createCourse(courseData) {
        try {
            const response = await axios.post(API_URL, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao criar curso');
        }
    },

    // BCuscar novo curso
    async getAllCourses() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            throw new Error(error.response?.data?.error || 'Erro ao buscar cursos');
        }
    },

    // Buscar um curso caraio
    async getCourseById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao buscar curso');
        }
    },

    // Att um curso 
    async updateCourse(id, courseData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao atualizar curso');
        }
    },

    // Deletar um curso
    async deleteCourse(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao excluir curso');
        }
    }
}; 