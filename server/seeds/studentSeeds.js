const Student = require('../models/Student');

const createStudentSeeds = async (classes) => {
  const students = [
    {
      name: "João Silva",
      email: "joao.silva@email.com",
      registration: "2024001",
      age: 20,
      CPF: "52998224725",
      gender: "Masculino",
      RG: "123456789",
      phone: "11999999999",
      course: classes[0].course,
      address: {
        street: "Rua A",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      }
    },
    {
      name: "Maria Santos",
      email: "maria.santos@email.com",
      registration: "2024002",
      age: 21,
      CPF: "12345678909",
      gender: "Feminino",
      RG: "987654321",
      phone: "11988888888",
      course: classes[0].course,
      address: {
        street: "Rua B",
        city: "São Paulo",
        state: "SP",
        zipCode: "04567-890"
      }
    },
    {
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      registration: "2024003",
      age: 19,
      CPF: "98765432109",
      gender: "Masculino",
      RG: "456789123",
      phone: "11977777777",
      course: classes[1].course,
      address: {
        street: "Rua C",
        city: "São Paulo",
        state: "SP",
        zipCode: "07890-123"
      }
    },
    {
      name: "Ana Costa",
      email: "ana.costa@email.com",
      registration: "2024004",
      age: 22,
      CPF: "45678912309",
      gender: "Feminino",
      RG: "789123456",
      phone: "11966666666",
      course: classes[2].course,
      address: {
        street: "Rua D",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      }
    },
    {
      name: "Lucas Ferreira",
      email: "lucas.ferreira@email.com",
      registration: "2024005",
      age: 20,
      CPF: "78912345609",
      gender: "Masculino",
      RG: "321654987",
      phone: "11955555555",
      course: classes[3].course,
      address: {
        street: "Rua E",
        city: "São Paulo",
        state: "SP",
        zipCode: "04567-890"
      }
    }
  ];

  try {
    // Limpa a coleção de alunos
    await Student.deleteMany({});
    console.log('✅ Coleção de alunos limpa');

    // Insere os novos alunos
    const insertedStudents = await Student.insertMany(students);
    console.log('✅ Alunos inseridos com sucesso:', insertedStudents.length);
    
    return insertedStudents;
  } catch (error) {
    console.error('❌ Erro ao inserir alunos:', error);
    throw error;
  }
};

module.exports = createStudentSeeds; 