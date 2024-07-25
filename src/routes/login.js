const express = require("express");
const jwt = require('jsonwebtoken');
const Cliente = require("../models/Cliente");
const verificarToken = require('../middlewares/verificarToken'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Ruta para login de administrador
router.post("/login", (req, res) => {
    const { correo, contrasena } = req.body;

    Cliente.findOne({ correo, contrasena })
        .then(cliente => {
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
            const token = jwt.sign({ correo: cliente.correo, userType: 'cliente', clienteId: cliente._id }, 'secretKey');
            res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token, userType: cliente.tipoUsuario, clienteId: cliente._id });
        })
        .catch(error => res.status(500).json({ error }));
});

module.exports = router;
