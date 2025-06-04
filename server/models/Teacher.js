const mongoose = require("mongoose");
const { validate } = require("cpf-check");
const bcrypt = require("bcrypt");

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
        validator: (v) => validate(v),
        message: "CPF inválido",
      },
    },
    phone: { type: String },
    course: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("erro ao hashear senha", error);
    next(error);
  }
});

teacherSchema.methods.comparePassword = async function (passwordInput) {
  return bcrypt.compare(passwordInput, this.password);
};

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
