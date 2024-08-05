// routes/doctor.js
const express = require("express");
const DoctorSchema = require("../models/Doctor");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });

// Create a new doctor
router.post("/doctores", upload.single('imagen'), async (req, res) => {
    try {
        const newDoctor = req.body;

        if (req.file) {
            const imagenBuffer = await fs.promises.readFile(req.file.path);
            newDoctor.imagen = `data:image/png;base64,${imagenBuffer.toString('base64')}`;
        }

        const doctor = new DoctorSchema(newDoctor);
        const savedDoctor = await doctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all doctors
router.get("/doctores", async (req, res) => {
    try {
        const doctores = await DoctorSchema.find();
        res.json(doctores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a doctor by ID
router.get("/doctores/:id", async (req, res) => {
    try {
        const doctor = await DoctorSchema.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a doctor by ID
router.put("/doctores/:id", upload.single('imagen'), async (req, res) => {
    try {
        const updatedData = req.body;

        if (req.file) {
            const imagenBuffer = await fs.promises.readFile(req.file.path);
            updatedData.imagen = `data:image/png;base64,${imagenBuffer.toString('base64')}`;
        }

        const doctor = await DoctorSchema.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a doctor by ID
router.delete("/doctores/:id", async (req, res) => {
    try {
        const doctor = await DoctorSchema.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.json({ message: 'Doctor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
