// Arquivo destinado para a configuração de funcionamento da API com o controller aqui nois tem tudo para configuração
import axios from 'axios';
import { endpoints } from '../config/api';

export const courseService = {
    // Configuração de novo curso caraio
    async createCourse(courseData) {
        try {
            const response = await axios.post(endpoints.courses, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao criar curso');
        }
    },

    // BCuscar novo curso
    async getAllCourses() {
        try {
            const response = await axios.get(endpoints.courses);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            throw new Error(error.response?.data?.error || 'Erro ao buscar cursos');
        }
    },

    // Buscar alunos por curso
    async getStudentsByCourse(courseId) {
        try {
            const response = await axios.get(`${endpoints.courses}/${courseId}/students`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar alunos do curso:', error);
            throw new Error(error.response?.data?.error || 'Erro ao buscar alunos do curso');
        }
    },

    // Buscar um curso caraio
    async getCourseById(id) {
        try {
            const response = await axios.get(`${endpoints.courses}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao buscar curso');
        }
    },

    // Att um curso 
    async updateCourse(id, courseData) {
        try {
            const response = await axios.put(`${endpoints.courses}/${id}`, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao atualizar curso');
        }
    },

    // Deletar um curso
    async deleteCourse(id) {
        try {
            const response = await axios.delete(`${endpoints.courses}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Erro ao excluir curso');
        }
    }
}; 