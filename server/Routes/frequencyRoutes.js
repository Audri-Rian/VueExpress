const express = require('express');
const router = express.Router();
const frequencyController = require('../Controllers/FrequencyController');

// Criar nova frequência
router.post('/', frequencyController.create);

// Buscar todas as frequências
router.get('/', frequencyController.findAll);

// Buscar frequências por turma e data
router.get('/class/:classId/date/:date', frequencyController.getFrequenciesByClassAndDate);

// Buscar frequência por ID
router.get('/:id', frequencyController.findOne);

// Atualizar frequência
router.put('/:id', frequencyController.update);

// Excluir frequência
router.delete('/:id', frequencyController.delete);

module.exports = router;
