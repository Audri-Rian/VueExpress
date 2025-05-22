const Frequency = require("../models/Frequency");

exports.create = async (req, res) => {
  try {
    const frequency = await Frequency.create(req.body);

    res.status(201).json(frequency);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar frequencia" });
  }
};

exports.findAll = async (req, res) => {
    try {
        const frequency 
    } catch (error) {
        
    }
}
