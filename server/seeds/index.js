const mongoose = require('mongoose');
const createCourseSeeds = require('./courseSeeds');
const createClassSeeds = require('./classSeeds');
const createStudentSeeds = require('./studentSeeds');

const seedDatabase = async () => {
  try {
    // Conecta ao MongoDB
    await mongoose.connect('mongodb://localhost:27017/gestao_escolar', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado ao MongoDB');

    // Executa os seeds em sequência
    console.log('🌱 Iniciando seeds...');
    
    console.log('📚 Criando cursos...');
    const courses = await createCourseSeeds();
    console.log('✅ Cursos criados:', courses.length);
    
    console.log('👥 Criando turmas...');
    const classes = await createClassSeeds(courses);
    console.log('✅ Turmas criadas:', classes.length);
    
    console.log('👨‍🎓 Criando alunos...');
    const students = await createStudentSeeds(classes);
    console.log('✅ Alunos criados:', students.length);

    console.log('✅ Seeds executados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    process.exit(1);
  }
};

// Executa os seeds
seedDatabase(); 