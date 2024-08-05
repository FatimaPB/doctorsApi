const express = require("express");
const router = express.Router();
const EspecialidadSchema = require("../models/Especialidad");

// Crear una nueva especialidad
router.post('/especialidades', async (req, res) => {
     
    const Especialidad = EspecialidadSchema(req.body);

    Especialidad
    .save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
});

// Obtener todas las especialidades
router.get('/especialidades', async (req, res) => {

    EspecialidadSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
});

// Obtener una especialidad por su ID
router.get('/especialidades/:id', async (req, res) => {
 
    const {id} = res.params;
    EspecialidadSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

// Obtener subespecialidades de una especialidad por su ID
router.get('/especialidades/:id/subespecialidades', async (req, res) => {
    const { id } = req.params;
    EspecialidadSchema
        .findById(id)
        .then((data) => {
            if (data) {
                res.json(data.subespecialidades); // Asumiendo que 'subespecialidades' es el nombre del campo
            } else {
                res.status(404).json({ message: "Especialidad no encontrada" });
            }
        })
        .catch((error) => res.json({ message: error }));
});

// Actualizar una especialidad por su ID
router.put('/especialidades/:id', async (req, res) => {
    const {id} = req.params;
    const {Especialidad}=req.body;

    EspecialidadSchema
    .updateOne({_id : id},{ $set: {Cliente}})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

// Eliminar una especialidad por su ID
router.delete('/especialidades/:id', async (req, res) => {

    const {id} = req.params;

    EspecialidadSchema
    .deleteOne({_id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
  
});

module.exports = router;
