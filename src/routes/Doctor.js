const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Doctor = require('../models/Doctor');

const router = express.Router();


// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Crear un nuevo doctor
router.post('/doctores', upload.single('imagen'), async (req, res) => {
  try {
    const {
      nombre,
      correo,
      contrasena,
      telefono,
      direccion,
      descripcion,
      especialidadId,
      subespecialidadId,
      preguntaId,
      respuesta,
    } = req.body;

    const imagen = req.file ? req.file.path : null;

    const doctor = new Doctor({
      nombre,
      correo,
      contrasena,
      telefono,
      direccion,
      descripcion,
      especialidadId,
      subespecialidadId,
      preguntaId,
      respuesta,
      imagen,
    });

    await doctor.save();
    res.status(201).json({
      message: 'Doctor agregado exitosamente',
      doctor: doctor,
    });
  } catch (error) {
    console.error('Error al agregar el doctor:', error.message);
    res.status(500).json({ message: 'Error al agregar el doctor', error: error.message });
  }
});

// Obtener todos los doctores
router.get('/doctores', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error al obtener doctores:', error.message);
    res.status(500).json({ message: 'Error al obtener doctores', error: error.message });
  }
});

// Obtener un doctor por ID
router.get('/doctores/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error al obtener el doctor:', error.message);
    res.status(500).json({ message: 'Error al obtener el doctor', error: error.message });
  }
});

// Actualizar un doctor
router.put('/doctores/:id', upload.single('imagen'), async (req, res) => {
  try {
    const {
      nombre,
      correo,
      contrasena,
      telefono,
      direccion,
      descripcion,
      especialidadId,
      subespecialidadId,
      preguntaId,
      respuesta,
    } = req.body;
    const imagen = req.file ? req.file.path : null;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        descripcion,
        especialidadId,
        subespecialidadId,
        preguntaId,
        respuesta,
        imagen,
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json({
      message: 'Doctor actualizado exitosamente',
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error('Error al actualizar el doctor:', error.message);
    res.status(500).json({ message: 'Error al actualizar el doctor', error: error.message });
  }
});

// Eliminar un doctor
router.delete('/doctores/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }
    res.status(200).json({ message: 'Doctor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el doctor:', error.message);
    res.status(500).json({ message: 'Error al eliminar el doctor', error: error.message });
  }
});

// Buscar doctores por subespecialidadId
router.get('/subespecialidad/:subespecialidadId', async (req, res) => {
  try {
    const { subespecialidadId } = req.params;
    const doctors = await Doctor.find({ subespecialidadId });
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error al buscar doctores por subespecialidad:', error.message);
    res.status(500).json({ message: 'Error al buscar doctores por subespecialidad', error: error.message });
  }
});

module.exports = router;
