const mongoose = require("mongoose");

const PreguntaSchema =  mongoose.Schema({

    pregunta:{
        type: String,
        require:true
    }
})

module.exports = mongoose.model('Pregunta', PreguntaSchema);