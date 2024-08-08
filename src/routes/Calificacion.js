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
router.get('/promedio/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
  
      if (!ObjectId.isValid(doctorId)) {
        return res.status(400).json({ error: 'ID de doctor inválido' });
      }
  
      // Convertir el doctorId a ObjectId
      const result = await db.collection('Calificacion').aggregate([
        { $match: { doctorId: ObjectId(doctorId) } },
        {
          $group: {
            _id: '$doctorId',
            promedio: { $avg: '$calificacion' }
          }
        }
      ]).toArray();
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'No hay calificaciones para este doctor' });
      }
  
      const promedio = result[0].promedio;
  
      res.json({ promedio });
    } catch (error) {
      console.error('Error al obtener el promedio de calificaciones:', error);
      res.status(500).json({ error: 'Error al obtener el promedio de calificaciones' });
    }
  });
  

module.exports = router;
