const express = require("express");
const ClienteSchema = require("../models/Cliente");
const router = express.Router();


//crear

router.post("/clientes",(req,res)=>{

    const Cliente = ClienteSchema(req.body);

    Cliente
    .save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
})

//obtener
router.get("/clientes",(req,res)=>{

    ClienteSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
})

//obtener por id

router.get("/Clientes/:id" , (req, res)=>{

    const {id} = res.params;

    ClienteSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//editar

router.put("/Clientes/:id" ,(req,res)=>{
    const {id} = req.params;
    const {Cliente}= req.body;

    ClienteSchema
    .updateOne({_id : id},{ $set: {Cliente}})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

//Eliminar

router.delete("/Clientes/:id" ,(req,res)=>{
    const {id} = req.params;
        
    ClienteSchema
    .deleteOne({_id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

module.exports = router;