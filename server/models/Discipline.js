const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cursoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Discipline = mongoose.model("Discipline", disciplineSchema);

module.exports = Discipline;
