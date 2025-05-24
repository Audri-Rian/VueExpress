const mongoose = require("mongoose");
const { validate } = require("cpf-check");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 100 },
    age: { type: Number, min: 18, max: 80 },
    email: { type: String, required: true, unique: true, lowercase: true },
    CPF: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          const cpfNumeros = v.replace(/\D/g, "");
          return validate(cpfNumeros);
        },
        message: (props) => `${props.value} Não é um CPF Válido`,
      },
    },
    phone: { type: String },
    course: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
