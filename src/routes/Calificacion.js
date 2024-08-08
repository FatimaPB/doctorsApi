const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Calificacion = require('../models/Calificacion');

// Ruta para registrar una calificación
router.post('/', async (req, res, next) => {
  try {
    const { doctorId, calificacion, clienteId } = req.body;

    const nuevaCalificacion = new Calificacion({
      doctorId: mongoose.Types.ObjectId(doctorId),
      calificacion,
      clienteId: mongoose.Types.ObjectId(clienteId)
    });

    await nuevaCalificacion.save();
    res.status(201).json({ mensaje: 'Calificación registrada correctamente' });
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener el promedio de calificaciones de un doctor
router.get('/promedio/:doctorId', async (req, res, next) => {
  try {
    const { doctorId } = req.params;

    const calificaciones = await Calificacion.aggregate([
      { $match: { doctorId: mongoose.Types.ObjectId(doctorId) } },
      { $group: { _id: '$doctorId', promedio: { $avg: '$calificacion' } } }
    ]);

    if (calificaciones.length > 0) {
      res.json({ promedio: calificaciones[0].promedio });
    } else {
      res.json({ promedio: 0 });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
