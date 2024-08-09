const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Calificacion = require('../models/Calificacion');

// Ruta para registrar una calificación
router.post('/calificaciones', async (req, res, next) => {
  try {
    const { doctorId, calificacion, clienteId } = req.body;

    const nuevaCalificacion = new Calificacion({
      doctorId:(doctorId),
      calificacion,
      clienteId:(clienteId)
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
      const { doctorId } = req.params;
  
      if (!doctorId) {
        return res.status(400).json({ error: 'ID de doctor inválido' });
      }
  
      console.log(`Buscando calificaciones para el doctor con ID: ${doctorId}`);
  
      const result = await Calificacion.aggregate([
        { $match: { doctorId: doctorId } },
        {
          $group: {
            _id: '$doctorId',
            promedio: { $avg: '$calificacion' }
          }
        }
      ]);
  
      console.log(`Resultado de la agregación: ${JSON.stringify(result)}`);
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'No hay calificaciones para este doctor' });
      }
  
      const promedio = result[0].promedio;
  
      if (promedio === null) {
        console.error(`Las calificaciones no son números o están ausentes.`);
      }
  
      res.json({ promedio });
    } catch (error) {
      console.error('Error al obtener el promedio de calificaciones:', error);
      res.status(500).json({ error: 'Error al obtener el promedio de calificaciones' });
    }
  });
  
  
  
  
  
module.exports = router;
