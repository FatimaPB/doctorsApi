const express = require("express");
const PreguntaSchema = require("../models/Preguntas");
const router =  express.Router();

//crear categoria

router.post("/preguntas", (req,res)=>{

    const Pregunta = PreguntaSchema(req.body);

    Pregunta
    .save()
    .then((data) => res.json(data))
    .catch((error)=> res.json ({message:error}));

});

//obtener categorias 

router.get("/preguntas" , (req, res)=>{

    PreguntaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//obtener categoria por su id
router.get("/preguntas/:id" , (req, res)=>{

    const {id} = res.params;

    PreguntaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});


//editar administrador

router.put("/preguntas/:id" ,(req,res)=>{
    const {id} = req.params;
    const {pregunta}= req.body;

    PreguntaSchema
        .updateOne({_id : id},{ $set: {pregunta}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


//Eliminar una categoria

router.delete("/preguntas/:id" ,(req,res)=>{
    const {id} = req.params;
        
    PreguntaSchema
        .deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


module.exports = router;