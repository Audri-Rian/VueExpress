const mongoose = require("mongoose");

const frequencySchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", // vai ser chamado quando for usar o populate
      required: [true, "Turma é obrigatória"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // vai ser chamado quando for usar o populate
      required: [true, "Aluno é obrigatório"],
    },
    data: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: { values: ["presente", "ausente", "justificado"] },
      default: "ausente",
      required: true,
    },
  },
  { timestamps: true }
);

const Frequency = mongoose.model("Frequency", frequencySchema);

module.exports = Frequency;
