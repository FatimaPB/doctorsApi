const mongoose = require("mongoose");

const questionsSchema =  mongoose.Schema({

    pregunta:{
        type: String,
        require:true
    }
})

module.exports = mongoose.model('question', questionsSchema);