import axios from 'axios';
import { endpoints } from '../config/api';

const teacherService = {
  async getAllTeachers() {
    try {
      const response = await axios.get(endpoints.teachers);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getTeacherById(id) {
    try {
      const response = await axios.get(`${endpoints.teachers}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createTeacher(teacherData) {
    try {
      const response = await axios.post(endpoints.teachers, teacherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateTeacher(id, teacherData) {
    try {
      const response = await axios.put(`${endpoints.teachers}/${id}`, teacherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteTeacher(id) {
    try {
      const response = await axios.delete(`${endpoints.teachers}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default teacherService; 