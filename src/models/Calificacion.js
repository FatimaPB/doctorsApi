const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  fecha: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Calificacion', calificacionSchema);
