const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 100 },
    age: { type: Number, min: 18, max: 80 },
    email: { type: String, required: true, unique: true, lowercase: true },
    CPF: { type: String, required: true, unique: true }, // funcao pra validar cpf aqui.
    phone: { type: Number },
    course: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
