const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, //codigo da turma
    course: { type: String, required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // vai ser chamado quando for usar o populate
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // vai ser chamado quando for usar o populate
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
