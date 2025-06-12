const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    discipline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discipline",
      required: true
    },
    grade1: {
      type: Number,
      min: 0,
      max: 10,
      default: null
    },
    grade2: {
      type: Number,
      min: 0,
      max: 10,
      default: null
    },
    finalGrade: {
      type: Number,
      min: 0,
      max: 10,
      default: null
    },
    status: {
      type: String,
      enum: ["Aprovado", "Reprovado"],
      default: "Reprovado"
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
