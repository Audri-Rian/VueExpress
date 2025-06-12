const Course = require('../models/Course');
const mongoose = require('mongoose');

const courses = [
  {
    title: "Engenharia de Software",
    code: "ESW",
    description: "Curso focado no desenvolvimento de software e sistemas",
    periods: 8
  },
  {
    title: "Ciência da Computação",
    code: "CCO",
    description: "Curso com foco em fundamentos teóricos e práticos da computação",
    periods: 8
  },
  {
    title: "Sistemas de Informação",
    code: "SIN",
    description: "Curso que integra tecnologia da informação e gestão de negócios",
    periods: 8
  },
  {
    title: "Análise e Desenvolvimento de Sistemas",
    code: "ADS",
    description: "Curso técnico focado em desenvolvimento de sistemas",
    periods: 4
  },
  {
    title: "Redes de Computadores",
    code: "RDC",
    description: "Curso especializado em infraestrutura e redes",
    periods: 4
  }
];

const seedCourses = async () => {
  try {
    // Limpa a coleção de cursos
    await Course.deleteMany({});
    console.log('✅ Coleção de cursos limpa');

    // Insere os novos cursos
    const insertedCourses = await Course.insertMany(courses);
    console.log('✅ Cursos inseridos com sucesso:', insertedCourses.length);
    
    return insertedCourses;
  } catch (error) {
    console.error('❌ Erro ao inserir cursos:', error);
    throw error;
  }
};

module.exports = seedCourses; 