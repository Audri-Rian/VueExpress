require("dotenv").config();
const Teacher = require("../models/Teacher.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "age",
      "email",
      "CPF",
      "phone",
      "course",
      "password",
    ];

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

    const existingEmail = await Teacher.findOne({
      email: req.body.email.toLowerCase().trim(),
    });
    if (existingEmail) {
      return res.status(400).json({
        error: "Email duplicado",
        message: "Email já cadastrado",
        field: "email",
      });
    }

    const existingCPF = await Teacher.findOne({ CPF: req.body.CPF });
    if (existingCPF) {
      return res.status(400).json({
        error: "CPF duplicado",
        message: "CPF já registrado",
        field: "CPF",
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

    console.log("JWT_SECRET carregado:", process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        course: teacher.course,
        role: "teacher",
      },
    });
  } catch (error) {
    console.error("ERRO NO REGISTRO", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Dados inválidos",
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Dado duplicado",
        details: "Email ou CPF já existente",
      });
    }

    return res.status(500).json({
      error: "Erro ao criar professor",
      details: error.message,
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
