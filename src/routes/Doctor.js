const express = require('express');
const multer = require('multer');
const path = require('path');
const Doctor = require('../models/Doctor');

const router = express.Router();

// Configuración de multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });

// Crear un nuevo doctor
router.post('/doctores', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, correo, contrasena, telefono, direccion, descripcion, especialidadId, subespecialidadId } = req.body;
    const imagen = req.file ? req.file.path : null;

    const newDoctor = new Doctor({
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
      imagen
    });

    await newDoctor.save();
    res.status(201).json({
      message: 'Doctor agregado exitosamente',
      doctor: newDoctor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el doctor', error });
  }
});

// Obtener todos los doctores
router.get('/doctores', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener doctores', error });
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
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el doctor', error });
  }
});

// Actualizar un doctor
router.put('/doctores/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, correo, contrasena, telefono, direccion, descripcion, especialidadId, subespecialidadId,preguntaId,respuesta } = req.body;
    const imagen = req.file ? req.file.path : null;

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, {
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
      imagen
    }, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json({
      message: 'Doctor actualizado exitosamente',
      doctor: updatedDoctor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el doctor', error });
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
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el doctor', error });
  }
});

// Buscar doctores por subespecialidadId
router.get('/subespecialidad/:subespecialidadId', async (req, res) => {
  try {
    const { subespecialidadId } = req.params;
    const doctors = await Doctor.find({ subespecialidadId });
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar doctores por subespecialidad', error });
  }
});

module.exports = router;
