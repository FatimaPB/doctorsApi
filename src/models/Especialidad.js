const mongoose = require("mongoose");

const EspecialidadSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    subespecialidades: {
        type: [String], // Array de strings para subespecialidades
        required: true
    }
});

module.exports = mongoose.model('Especialidad', EspecialidadSchema);
