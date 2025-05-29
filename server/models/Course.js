const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "O título do curso é obrigatório"],
      trim: true,
      maxlength: [100, "O título não pode exceder 100 caracteres"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "A descrição é obrigatória"],
      trim: true,
      minlength: [50, "A descrição precisa ter pelo menos 50 caracteres"],
    },
    code: {
      type: String,
      required: [true, "O código é obrigatório"],
      trim: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 4,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
