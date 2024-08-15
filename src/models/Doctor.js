const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  especialidadId: {
    type: String,
    required: true,
  },
  subespecialidadId: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  },
});

module.exports = mongoose.model('doctor', DoctorSchema);
