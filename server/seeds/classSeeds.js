const Class = require('../models/Class');
const Course = require('../models/Course');

const createClassSeeds = async (courses) => {
  const currentYear = new Date().getFullYear();
  
  const classes = [
    {
      name: "Turma A",
      course: courses[0]._id, // Engenharia de Software
      period: "1º período",
      year: currentYear,
      shift: "Matutino"
    },
    {
      name: "Turma B",
      course: courses[0]._id, // Engenharia de Software
      period: "2º período",
      year: currentYear,
      shift: "Vespertino"
    },
    {
      name: "Turma C",
      course: courses[1]._id, // Ciência da Computação
      period: "1º período",
      year: currentYear,
      shift: "Noturno"
    },
    {
      name: "Turma D",
      course: courses[2]._id, // Sistemas de Informação
      period: "3º período",
      year: currentYear,
      shift: "Matutino"
    },
    {
      name: "Turma E",
      course: courses[3]._id, // ADS
      period: "2º período",
      year: currentYear,
      shift: "Vespertino"
    }
  ];

  try {
    // Limpa a coleção de turmas
    await Class.deleteMany({});
    console.log('✅ Coleção de turmas limpa');

    // Insere as novas turmas
    const insertedClasses = await Class.insertMany(classes);
    console.log('✅ Turmas inseridas com sucesso:', insertedClasses.length);
    
    return insertedClasses;
  } catch (error) {
    console.error('❌ Erro ao inserir turmas:', error);
    throw error;
  }
};

module.exports = createClassSeeds; 