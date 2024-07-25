const express = require("express");
const DoctorSchema = require("../models/Doctor");
const Doctor = require("../models/Doctor");
const router = express.Router();


//crear

router.post("/doctores",(req,res)=>{

    const Doctor = ClienteSchema(req.body);

    Doctor
    .save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
})

//obtener
router.get("/doctores",(req,res)=>{

    DoctorSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
})

//obtener por id

router.get("/doctores/:id" , (req, res)=>{

    const {id} = res.params;

    DoctorSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//editar

router.put("/doctores/:id" ,(req,res)=>{
    const {id} = req.params;
    const {Doctor}= req.body;

    DoctorSchema
    .updateOne({_id : id},{ $set: {Doctor}})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

//Eliminar

router.delete("/doctores/:id" ,(req,res)=>{
    const {id} = req.params;
        
    DoctorSchema
    .deleteOne({_id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

module.exports = router;
