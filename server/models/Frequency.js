const mongoose = require("mongoose");

const frequencySchema = mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", // vai ser chamado quando for usar o populate
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // vai ser chamado quando for usar o populate
      required: true,
    },
    data: { type: Date, required: true, default: Date.now },
    present: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Frequency = mongoose.model("Frequency", frequencySchema);

module.exports = Frequency;
