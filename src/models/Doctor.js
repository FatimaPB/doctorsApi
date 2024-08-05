const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define el esquema para el modelo Doctor
const doctorSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  especialidadId: {
    type: Schema.Types.ObjectId,
    ref: 'Especialidad',
    required: true
  },
  subespecialidadId: {
    type: Schema.Types.ObjectId,
    ref: 'Subespecialidad'
  },
  imagen: {
    type: String // URL o path de la imagen
  }
});

// Crea el modelo Doctor
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
