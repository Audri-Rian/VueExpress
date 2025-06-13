const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const endpoints = {
  auth: {
    login: `${API_URL}/api/teachers/loginProfessor`,
    register: `${API_URL}/api/teachers/registerProfessor`
  },
  teachers: `${API_URL}/api/teachers`,
  students: {
    base: `${API_URL}/api/students`,
    register: `${API_URL}/api/students/registerAluno`
  },
  classes: `${API_URL}/api/classes`,
  courses: `${API_URL}/api/courses`,
  disciplines: `${API_URL}/api/disciplines`,
  frequencies: `${API_URL}/api/frequencies`,
  notes: {
    base: `${API_URL}/api/notes`,
    byCourseAndDiscipline: (courseId, disciplineId) => 
      `${API_URL}/api/notes/course/${courseId}/discipline/${disciplineId}`,
    byStudent: (studentId) => `${API_URL}/api/notes/student/${studentId}`,
    bulk: `${API_URL}/api/notes/bulk`
  },
  stats: `${API_URL}/api/stats`
};

export default API_URL; 