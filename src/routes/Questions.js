const express = require("express");
const questionsSchema = require("../models/Questios");
const router =  express.Router();

//crear categoria

router.post("/questions", (req,res)=>{

    const Pregunta = questionsSchema(req.body);

    Pregunta
    .save()
    .then((data) => res.json(data))
    .catch((error)=> res.json ({message:error}));

});

//obtener categorias 

router.get("/questions" , (req, res)=>{

    questionsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//obtener categoria por su id
router.get("/questions/:id" , (req, res)=>{

    const {id} = res.params;

    questionsSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});


//editar administrador

router.put("/questions/:id" ,(req,res)=>{
    const {id} = req.params;
    const {pregunta}= req.body;

    questionsSchema
        .updateOne({_id : id},{ $set: {pregunta}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


//Eliminar una categoria

router.delete("/questions/:id" ,(req,res)=>{
    const {id} = req.params;
        
    questionsSchema
        .deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


module.exports = router;