const mongoose = require("mongoose");

const ClienteSchema = mongoose.Schema({

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
    telefono:{
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


})

module.exports = mongoose.model('cliente',ClienteSchema);
