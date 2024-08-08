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

router.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCliente = req.body;
  
    try {
      const result = await ClienteSchema.updateOne({ _id: id }, { $set: updatedCliente });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error updating client', error });
    }
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