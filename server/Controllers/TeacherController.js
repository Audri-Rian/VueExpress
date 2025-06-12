require("dotenv").config();
const Teacher = require("../models/Teacher.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { cpf } = require("cpf-cnpj-validator");

exports.register = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "age",
      "email",
      "CPF",
      "phone",
      "password",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Campos obrigatórios não preenchidos",
        message: "Por favor, preencha todos os campos obrigatórios",
        details: missingFields.reduce((acc, field) => {
          acc[field] = `O campo ${
            field === 'CPF' ? 'CPF' :
            field === 'name' ? 'Nome' :
            field === 'age' ? 'Idade' :
            field === 'email' ? 'Email' :
            field === 'phone' ? 'Telefone' :
            field === 'password' ? 'Senha' : field
          } é obrigatório`;
          return acc;
        }, {}),
      });
    }

    // Validação de idade
    if (req.body.age < 18 || req.body.age > 80) {
      return res.status(400).json({
        success: false,
        error: "Idade inválida",
        message: "A idade deve estar entre 18 e 80 anos",
        field: "age"
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        error: "Email inválido",
        message: "Por favor, insira um email válido",
        field: "email"
      });
    }

    // Validação de CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cpfValue = req.body.CPF.replace(/\D/g, '');
    if (!cpfRegex.test(req.body.CPF)) {
      return res.status(400).json({
        success: false,
        error: "CPF inválido",
        message: "Por favor, insira um CPF válido no formato 000.000.000-00",
        field: "CPF"
      });
    }

    // Validação adicional do CPF usando a biblioteca
    if (!cpf.isValid(cpfValue)) {
      return res.status(400).json({
        success: false,
        error: "CPF inválido",
        message: "O CPF informado não é válido",
        field: "CPF"
      });
    }

    // Validação de telefone
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(req.body.phone)) {
      return res.status(400).json({
        success: false,
        error: "Telefone inválido",
        message: "Por favor, insira um telefone válido no formato (00) 00000-0000",
        field: "phone"
      });
    }

    // Validação de senha
    if (req.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Senha inválida",
        message: "A senha deve ter pelo menos 6 caracteres",
        field: "password"
      });
    }

    const existingEmail = await Teacher.findOne({
      email: req.body.email.toLowerCase().trim(),
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: "Email já cadastrado",
        message: "Este email já está sendo utilizado por outro professor",
        field: "email"
      });
    }

    const existingCPF = await Teacher.findOne({ CPF: req.body.CPF });
    if (existingCPF) {
      return res.status(400).json({
        success: false,
        error: "CPF já cadastrado",
        message: "Este CPF já está sendo utilizado por outro professor",
        field: "CPF"
      });
    }

    const teacher = await Teacher.create({
      ...req.body,
      email: req.body.email.toLowerCase().trim(),
    });

    const payload = {
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: "teacher",
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("Chave JWT não configurada");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return res.status(201).json({
      success: true,
      message: "Professor cadastrado com sucesso!",
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
      },
    });
  } catch (error) {
    console.error("ERRO NO REGISTRO:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Dados inválidos",
        message: "Por favor, verifique os dados informados",
        details: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Dado duplicado",
        message: "Este email ou CPF já está cadastrado no sistema",
        details: "Por favor, utilize outro email ou CPF"
      });
    }

    return res.status(500).json({
      success: false,
      error: "Erro ao criar professor",
      message: "Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.",
      details: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios" });
    }

    const teacher = await Teacher.findOne({
      email: req.body.email.toLowerCase().trim(),
    }).select("+password");
    if (!teacher) {
      return res.status(404).json({ msg: "Professor não encontrado" });
    }

    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }

    const payload = {
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: "teacher",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
      },
    });
  } catch (error) {
    console.error("Erro no login do professor:", error);
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");

    return res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
};

exports.update = async (req, res) => {
  const id = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }
    const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    return res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params;
  try {
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    console.error("erro ao deletar professor:", error);
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
};
