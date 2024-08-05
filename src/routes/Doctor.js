const express = require("express");
const DoctorSchema = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Crear un nuevo doctor
router.post("/doctores", upload.single("imagen"), (req, res) => {
  const { nombre, correo, telefono, especialidadId, subespecialidadId, preguntaId, respuesta, tipoUsuario } = req.body;
  const imagen = req.file ? req.file.path : '';

  const Doctor = DoctorSchema({
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

  Doctor.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/doctores", (req, res) => {
  DoctorSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener un doctor por ID
router.get("/doctores/:id", (req, res) => {
  const { id } = req.params;

  DoctorSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Editar un doctor
router.put("/doctores/:id", upload.single("imagen"), (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, especialidadId, subespecialidadId, preguntaId, respuesta, tipoUsuario } = req.body;
  const imagen = req.file ? req.file.path : undefined;

  const updateFields = {
    nombre,
    correo,
    telefono,
    especialidadId,
    subespecialidadId,
    preguntaId,
    respuesta,
    tipoUsuario,
    ...(imagen && { imagen }),
  };

  DoctorSchema.updateOne({ _id: id }, { $set: updateFields })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un doctor
router.delete("/doctores/:id", (req, res) => {
  const { id } = req.params;

  DoctorSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
