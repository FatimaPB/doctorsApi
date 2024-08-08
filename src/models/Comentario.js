const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true
  },
  clienteId: {
    type:String,
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comentario', comentarioSchema);

