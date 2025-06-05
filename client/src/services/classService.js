import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const classService = {
    async getAllClasses() {
        try {
            const response = await axios.get(`${API_URL}/classes`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar turmas');
        }
    },

    async getClassById(id) {
        try {
            const response = await axios.get(`${API_URL}/classes/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar turma');
        }
    },

    async createClass(classData) {
        try {
            const response = await axios.post(`${API_URL}/classes`, classData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao criar turma');
        }
    },

    async updateClass(id, classData) {
        try {
            const response = await axios.put(`${API_URL}/classes/${id}`, classData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao atualizar turma');
        }
    },

    async deleteClass(id) {
        try {
            const response = await axios.delete(`${API_URL}/classes/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao excluir turma');
        }
    }
};

export { classService }; 