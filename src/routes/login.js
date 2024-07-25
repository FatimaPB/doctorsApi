// routes/login.js
const express = require("express");
const Cliente = require("../models/Cliente"); // Asegúrate de importar el modelo correcto
const router = express.Router();

// Ruta para login de administrador
router.post("/login", (req, res) => {
    const { correo, contrasena } = req.body;

    // Buscar al administrador por nombre y contraseña
    Cliente.findOne({ correo, contrasena })
        .then(Cliente => {
            if (!Cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
            // Aquí podrías implementar la lógica para manejar la sesión del administrador, como generar un token JWT
            res.json(Cliente); // En este caso, solo devolvemos el administrador encontrado
        })
        .catch(error => res.status(500).json({ error }));
});

module.exports = router;
