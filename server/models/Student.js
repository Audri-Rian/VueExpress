const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema(
  {
    registration: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      minLength: [5, "Nome deve ter pelo menos 5 caracteres"],
      maxLength: [80, "Nome deve ter no máximo 80 caracteres"],
    },
    age: {
      type: Number,
      required: [true, "Idade é obrigatória"],
      min: [0, "Idade não pode ser negativa"],
      max: [120, "Idade inválida"],
    },
    CPF: {
      type: String,
      required: [true, "CPF é obrigatório"],
      unique: true,
      validate: {
        validator: (v) => v.replace(/\D/g, "").length === 11,
        message: "CPF deve conter 11 dígitos"
      }
    },
    gender: {
      type: String,
      required: [true, "Gênero é obrigatório"],
    },
    RG: {
      type: String,
      required: [true, "RG é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Curso é obrigatório"],
    },
    address: {
      street: {
        type: String,
        required: [true, "Rua é obrigatória"],
      },
      city: {
        type: String,
        required: [true, "Cidade é obrigatória"],
      },
      state: {
        type: String,
        required: [true, "Estado é obrigatório"],
      },
      zipCode: {
        type: String,
        required: [true, "CEP é obrigatório"],
      },
    },
    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

// Middleware para gerar matrícula antes de salvar
studentsSchema.pre("validate", function (next) {
  if (!this.registration) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    this.registration = `${year}${random}`;
  }
  next();
});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;
