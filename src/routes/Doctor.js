const express = require("express");
const DoctorSchema = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Añade la extensión del archivo
  },
});

const upload = multer({ storage: storage });

// Crear un nuevo doctor
router.post("/doctores", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, correo, telefono, especialidadId, subespecialidadId, preguntaId, respuesta, tipoUsuario } = req.body;
    const imagen = req.file ? req.file.path : '';

    const doctor = new DoctorSchema({
      nombre,
      correo,
      telefono,
      especialidadId,
      subespecialidadId,
      preguntaId,
      respuesta,
      tipoUsuario,
      imagen,
    });

    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los doctores
router.get("/doctores", async (req, res) => {
  try {
    const doctors = await DoctorSchema.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un doctor por ID
router.get("/doctores/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await DoctorSchema.findById(id);
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: "Doctor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar un doctor
router.put("/doctores/:id", upload.single("imagen"), async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, especialidadId, subespecialidadId, preguntaId, respuesta, tipoUsuario } = req.body;
  const imagen = req.file ? req.file.path : undefined;

  try {
    const updateFields = {
      nombre,
      correo,
      telefono,
      especialidadId,
      subespecialidadId,
      preguntaId,
      respuesta,
      tipoUsuario,
      ...(imagen && { imagen }), // Solo agrega imagen si existe
    };

    const updatedDoctor = await DoctorSchema.findByIdAndUpdate(id, updateFields, { new: true });
    if (updatedDoctor) {
      res.status(200).json(updatedDoctor);
    } else {
      res.status(404).json({ message: "Doctor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un doctor
router.delete("/doctores/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await DoctorSchema.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Doctor eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Doctor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
