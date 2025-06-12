const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Class = require('../models/Class');
const Course = require('../models/Course');
const Notes = require('../models/Notes');
const mongoose = require('mongoose');

// Contar total de alunos
router.get('/dashboard/students/count', async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Contar total de turmas
router.get('/dashboard/classes/count', async (req, res) => {
  try {
    // Listar todas as turmas
    const allClasses = await Class.find({});
    console.log('Todas as turmas encontradas:', JSON.stringify(allClasses, null, 2));

    // Verificar a coleção no MongoDB
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Coleções disponíveis:', collections.map(c => c.name));

    // Contar documentos na coleção
    const count = allClasses.length;
    console.log('Número de turmas encontradas:', count);

    res.json({ count });
  } catch (error) {
    console.error('Erro detalhado ao contar turmas:', error);
    res.status(500).json({ message: error.message });
  }
});

// Contar total de cursos
router.get('/dashboard/courses/count', async (req, res) => {
  try {
    // Listar todos os cursos
    const allCourses = await Course.find({});
    console.log('Todos os cursos encontrados:', JSON.stringify(allCourses, null, 2));

    // Verificar a coleção no MongoDB
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Coleções disponíveis:', collections.map(c => c.name));

    // Contar documentos na coleção
    const count = allCourses.length;
    console.log('Número de cursos encontrados:', count);

    res.json({ count });
  } catch (error) {
    console.error('Erro detalhado ao contar cursos:', error);
    res.status(500).json({ message: error.message });
  }
});

// Alunos por curso
router.get('/dashboard/students/by-course', async (req, res) => {
  try {
    const studentsByCourse = await Student.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseInfo'
        }
      },
      {
        $unwind: '$courseInfo'
      },
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 },
          courseTitle: { $first: '$courseInfo.title' }
        }
      },
      {
        $project: {
          _id: 0,
          courseTitle: 1,
          count: 1
        }
      }
    ]);
    res.json(studentsByCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Turmas por turno
router.get('/dashboard/classes/by-shift', async (req, res) => {
  try {
    const classesByShift = await Class.aggregate([
      {
        $group: {
          _id: '$shift',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          shift: '$_id',
          count: 1
        }
      }
    ]);
    res.json(classesByShift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Média de notas por disciplina
router.get('/dashboard/notes/by-discipline', async (req, res) => {
  try {
    const notesByDiscipline = await Notes.aggregate([
      {
        $lookup: {
          from: 'disciplines',
          localField: 'discipline',
          foreignField: '_id',
          as: 'disciplineInfo'
        }
      },
      {
        $unwind: '$disciplineInfo'
      },
      {
        $group: {
          _id: '$discipline',
          average: { $avg: '$value' },
          disciplineName: { $first: '$disciplineInfo.name' }
        }
      },
      {
        $project: {
          _id: 0,
          disciplineName: 1,
          average: { $round: ['$average', 2] }
        }
      }
    ]);
    res.json(notesByDiscipline);
  } catch (error) {
    console.error('Erro ao buscar médias por disciplina:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 