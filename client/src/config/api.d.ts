declare const endpoints: {
  auth: {
    login: string;
    register: string;
  };
  teachers: string;
  students: {
    base: string;
    register: string;
  };
  classes: string;
  courses: string;
  disciplines: string;
  frequencies: string;
  notes: {
    base: string;
    byCourseAndDiscipline: (courseId: string, disciplineId: string) => string;
    byStudent: (studentId: string) => string;
    bulk: string;
  };
  stats: string;
};

declare const API_URL: string;

export { endpoints, API_URL as default }; 