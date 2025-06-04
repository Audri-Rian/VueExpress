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
            throw this.handleError(error);
        }
    },

    // BCuscar novo curso
    async getAllCourses() {
        try {
            const response = await axios.get(`${API_URL}/courses`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Buscar um curso caraio
    async getCourse(id) {
        try {
            const response = await axios.get(`${API_URL}/courses/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Att um curso 
    async updateCourse(id, courseData) {
        try {
            const response = await axios.put(`${API_URL}/courses/${id}`, courseData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Deletar um curso
    async deleteCourse(id) {
        try {
            const response = await axios.delete(`${API_URL}/courses/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    handleError(error) {
        if (error.response) {
            return {
                message: error.response.data.error || 'Erro na operação',
                status: error.response.status
            };
        } else if (error.request) {

            return {
                message: 'Não foi possível conectar ao servidor',
                status: 0
            };
        } else {

            return {
                message: 'Erro ao processar a requisição',
                status: 0
            };
        }
    }
}; 