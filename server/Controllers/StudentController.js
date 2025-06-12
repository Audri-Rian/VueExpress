require("dotenv").config();
const Student = require("../models/Student");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.register = async (req, res) => {
  try {
    // Define os campos obrigatórios para validação
    const requiredFields = [
      "name",
      "CPF",
      "email",
      "course",
      "age",
      "gender",
      "RG",
      "phone",
    ];
    // Verifica se há campos obrigatórios faltando
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Erro de validação",
        message: "Campos obrigatórios não preenchidos",
        details: missingFields.reduce((acc, field) => {
          acc[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } é obrigatório`;
          return acc;
        }, {}),
      });
    }

    // Verifica se o curso existe
    const courseExists = await Course.findById(req.body.course);
    if (!courseExists) {
      return res.status(400).json({
        error: "Erro de validação",
        message: "Curso não encontrado",
        details: { course: "Curso selecionado não existe" },
      });
    }

    const existingEmail = await Student.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (existingEmail) {
      return res.status(400).json({
        error: "Email duplicado",
        message: "Já existe um aluno cadastrado com este email",
        field: "email",
      });
    }

    const existingCPF = await Student.findOne({ CPF: req.body.CPF });
    if (existingCPF) {
      return res.status(400).json({
        error: "CPF duplicado",
        message: "Já existe um aluno cadastrado com este CPF",
        field: "CPF",
      });
    }

    // Validação do endereço
    if (
      !req.body.address ||
      !req.body.address.street ||
      !req.body.address.city ||
      !req.body.address.state ||
      !req.body.address.zipCode
    ) {
      return res.status(400).json({
        error: "Erro de validação",
        message: "Endereço incompleto",
        details: {
          "address.street": !req.body.address?.street
            ? "Rua é obrigatória"
            : "",
          "address.city": !req.body.address?.city ? "Cidade é obrigatória" : "",
          "address.state": !req.body.address?.state
            ? "Estado é obrigatório"
            : "",
          "address.zipCode": !req.body.address?.zipCode
            ? "CEP é obrigatório"
            : "",
        },
      });
    }

    // Gera a matrícula
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const registration = `${year}${random}`;

    const newStudent = await Student.create({
      ...req.body,
      registration,
      email: req.body.email.toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        role: "student",
      },
    });
  } catch (error) {
    console.error("ERRO NO REGISTRO", error);
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        error: "Erro de validação",
        details: validationErrors,
        message: "Por favor, verifique os campos obrigatórios",
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const fieldName = field === "CPF" ? "CPF" : "email";
      return res.status(400).json({
        error: `${fieldName} duplicado`,
        message: `Já existe um aluno cadastrado com este ${fieldName}`,
        field: fieldName,
      });
    }

    return res.status(500).json({
      error: "Erro ao criar aluno",
      details: error.message,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório para busca" });
    }

    const student = await Student.findOne({
      name: { $regex: name, $options: "i" },
    }).populate("course");

    if (!student) {
      return res
        .status(404)
        .json({ msg: "Nenhum aluno encontrado com esse nome" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("erro ao buscar por nome", error);
    res.status(500).json({ error: "erro interno ao buscar aluno" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const students = await Student.find().populate("course");

    if (!students) {
      return res.status(404).json({ msg: "Nenhum aluno encontrado" });
    }

    return res.json(students);
  } catch (error) {
    console.error("erro interno", error);
    res.status(500).json({ error: "Erro ao listar os alunos" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id fornecido não é válido" });
    }

    // Se estiver atualizando o curso, verifica se ele existe
    if (req.body.course) {
      const courseExists = await Course.findById(req.body.course);
      if (!courseExists) {
        return res.status(400).json({ msg: "Curso não encontrado" });
      }
    }

    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("course");

    if (!student) {
      return res.status(404).json({ msg: "Nenhum aluno encontrado" });
    }

    return res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ error: "nenhum aluno encontrado" });
    }

    return res.status(200).json({ msg: "Aluno excluído com sucesso", student });
  } catch (error) {
    console.error("erro ao deletar aluno: ", error);
    res.status(500).json({ error: "erro interno ao deletar aluno" });
  }
};
