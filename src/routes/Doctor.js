const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({

    nombre:{
        type: String,
        require: true
    },
    correo:{
        type: String,
        require: true
    },
    contrasena:{
        type: String,
        require: true
    },
    direccion:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    },
    telefono:{
        type: String,
        require: true
    },
    especialidadId:{
        type: String,
        require: true
    },
    subespecialidadId:{
        type: String,
        require: true
    },
    preguntaId:{
        type: String,
        require: true
    },
    respuesta:{
        type: String,
        require: true
    },
    tipoUsuario:{
        type: String,
        require: true
    },
    imagen: {
        type: String  
      }



})

module.exports = mongoose.model('doctor',DoctorSchema);

