import axios from 'axios';
import { endpoints } from '../config/api';

const classService = {
    async getAllClasses() {
        try {
            const response = await axios.get(endpoints.classes);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar turmas');
        }
    },

    async getClassById(id) {
        try {
            const response = await axios.get(`${endpoints.classes}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar turma');
        }
    },

    async createClass(classData) {
        try {
            const response = await axios.post(endpoints.classes, classData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao criar turma');
        }
    },

    async updateClass(id, classData) {
        try {
            const response = await axios.put(`${endpoints.classes}/${id}`, classData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao atualizar turma');
        }
    },

    async deleteClass(id) {
        try {
            const response = await axios.delete(`${endpoints.classes}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao excluir turma');
        }
    }
};

export { classService }; 