const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comentario = require('../models/Comentario');

// Ruta para registrar un comentario
router.post('/comentarios', async (req, res, next) => {
    try {
      const { doctorId, comentario, clienteId } = req.body;
  
      if (!doctorId || !comentario || !clienteId) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
      }
  
      const nuevoComentario = new Comentario({
        doctorId,
        comentario,
        clienteId
      });
  
      await nuevoComentario.save();
      res.status(201).json({ mensaje: 'Comentario registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar el comentario:', error);
      res.status(500).json({ mensaje: 'Error al registrar el comentario', error: error.message });
    }
  });

// Ruta para obtener los comentarios de un doctor
router.get('/comentarios/:doctorId', async (req, res, next) => {
  try {
    const { doctorId } = req.params;

    const comentarios = await Comentario.find({ doctorId:(doctorId) }).sort({ fecha: -1 });

    res.json(comentarios);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
