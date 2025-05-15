const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 5, maxLength: 80 },
    age: { type: Number },
    CPF: { type: String, required: true, unique: true }, //funcao para validar cpf
    gender: { type: String },
    RG: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    course: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
  },
  { timestamps: true }
);

const Students = mongoose.model("Student", studentsSchema);

module.exports = Students;
