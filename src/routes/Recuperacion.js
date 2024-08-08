const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const bcrypt = require('bcrypt');

// Ruta para verificar correo y respuesta
router.post('/verificar-correo-respuesta', async (req, res) => {
  const { correo, respuesta } = req.body;

  try {
    // Buscar al cliente por correo y respuesta
    const cliente = await Cliente.findOne({ correo, respuesta });

    if (!cliente) {
      return res.status(404).json({ error: 'Correo o respuesta incorrecta.' });
    }

    // Responder al cliente con éxito
    res.status(200).json({ message: 'Correo y respuesta verificados.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al verificar el correo o la respuesta.' });
  }
});

// Ruta para establecer una nueva contraseña
router.post('/establecer-nueva-contrasena', async (req, res) => {
  const { correo, nuevaContrasena } = req.body;

  try {
    // Buscar al cliente por correo
    const cliente = await Cliente.findOne({ correo });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }

    // Generar el hash de la nueva contraseña
    const hash = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar la contraseña del cliente en la base de datos
    cliente.contrasena = hash;
    await cliente.save();

    // Responder al cliente con éxito
    res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al intentar actualizar la contraseña.' });
  }
});

module.exports = router;
