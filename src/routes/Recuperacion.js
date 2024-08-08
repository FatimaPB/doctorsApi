const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente'); // Asegúrate de que la ruta al modelo sea correcta
const bcrypt = require('bcrypt'); // Utiliza bcrypt para almacenar contraseñas de manera segura

// Ruta para establecer una nueva contraseña
router.post('/establecer-nueva-contrasena', async (req, res) => {
  const { correo, respuesta, nuevaContrasena } = req.body;

  try {
    // Buscar al cliente por correo y respuesta a la pregunta de seguridad
    const cliente = await Cliente.findOne({ correo, respuesta });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado o respuesta incorrecta.' });
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
